// Netlify Function: ดึงราคาหุ้น US + ทองคำจาก Yahoo Finance
// แปลงเป็น THB โดยใช้อัตรา USD/THB อัตโนมัติ

const GOLD_SYMBOL = 'GC=F';      // Gold Futures (USD/troy oz)
const FX_SYMBOL   = 'USDTHB=X';  // USD → THB rate

async function yahooQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`Yahoo Finance error: ${res.status} for ${symbol}`);
  const json = await res.json();
  const meta = json?.chart?.result?.[0]?.meta;
  if (!meta) throw new Error(`No data for ${symbol}`);
  return {
    symbol: meta.symbol,
    price:  meta.regularMarketPrice ?? meta.previousClose,
    currency: meta.currency,
    name:   meta.shortName || symbol,
  };
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=900', // cache 15 นาที
  };

  const { symbol, type } = event.queryStringParameters || {};
  if (!symbol) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'symbol required' }) };
  }

  try {
    // ดึง USD/THB ก่อนเสมอ
    const fx = await yahooQuote(FX_SYMBOL);
    const usdThb = fx.price;

    if (type === 'gold' || symbol === GOLD_SYMBOL) {
      // ทองคำ: GC=F คือ USD/troy oz → แปลงเป็น USD/gram และ THB/gram
      const gold = await yahooQuote(GOLD_SYMBOL);
      const pricePerOz   = gold.price;
      const pricePerGram = pricePerOz / 31.1035;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          symbol: 'GOLD',
          name: 'Gold',
          price_usd_oz:   pricePerOz,
          price_usd_gram: parseFloat(pricePerGram.toFixed(4)),
          price_thb_gram: parseFloat((pricePerGram * usdThb).toFixed(2)),
          usd_thb:        usdThb,
          type: 'gold',
        }),
      };
    }

    // หุ้น US ทั่วไป
    const stock = await yahooQuote(symbol);
    const priceThb = stock.price * usdThb;
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        symbol: stock.symbol,
        name:   stock.name,
        price_usd: stock.price,
        price_thb: parseFloat(priceThb.toFixed(2)),
        usd_thb:   usdThb,
        type: 'stock',
      }),
    };

  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
