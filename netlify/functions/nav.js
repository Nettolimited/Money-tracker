// Netlify Function: ดึง NAV กองทุนจาก SEC Thailand API
// env var ที่ต้องตั้งใน Netlify dashboard: DAILY_INFO_KEY

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=1800',
  };

  const { proj_id } = event.queryStringParameters || {};
  if (!proj_id) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'proj_id required' }) };
  }

  const DAILY_KEY = process.env.DAILY_INFO_KEY;
  if (!DAILY_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  // วนหาข้อมูลย้อนหลัง 7 วัน (กันวันหยุด)
  const today = new Date();
  for (let i = 0; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const res = await fetch(
      `https://api.sec.or.th/FundDailyInfo/${proj_id}/dailynav/${dateStr}`,
      { headers: { 'Ocp-Apim-Subscription-Key': DAILY_KEY } }
    );

    if (res.status === 200) {
      const data = await res.json();
      // data คือ array ของ class ต่างๆ ในกองทุน เอาอันแรก
      const first = Array.isArray(data) ? data[0] : data;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          proj_id,
          date: dateStr,
          nav: first?.last_val,
          class_name: first?.class_abbr_name,
          funds: data,
        }),
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: `ไม่พบข้อมูล NAV สำหรับ ${proj_id} ใน 7 วันที่ผ่านมา` }),
  };
};
