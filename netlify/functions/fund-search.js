// Netlify Function: ค้นหากองทุนรวมจากชื่อหรือรหัสย่อ
// env var: FACTSHEET_KEY

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=3600',
  };

  const keyword = (event.queryStringParameters?.q || '').trim().toLowerCase();
  if (keyword.length < 2) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'พิมพ์อย่างน้อย 2 ตัวอักษร' }) };
  }

  const KEY = process.env.FACTSHEET_KEY;
  if (!KEY) return { statusCode: 500, headers, body: JSON.stringify({ error: 'API key not configured' }) };

  try {
    // ดึง AMC list ทั้งหมด
    const amcRes = await fetch('https://api.sec.or.th/FundFactsheet/fund/amc', {
      headers: { 'Ocp-Apim-Subscription-Key': KEY },
    });
    const amcs = await amcRes.json();

    // หา AMC ที่ชื่อตรงกับ keyword ก่อน (ลดจำนวน API call)
    const matchedAmcs = amcs.filter(a =>
      a.name_en?.toLowerCase().includes(keyword) ||
      a.name_th?.toLowerCase().includes(keyword)
    );

    // ถ้าไม่มี AMC ตรง → ค้นทุก AMC แบบ parallel (แต่ limit ไว้ 20 เพื่อความเร็ว)
    const targetAmcs = matchedAmcs.length > 0 ? matchedAmcs : amcs.slice(0, 20);

    const fundLists = await Promise.all(
      targetAmcs.map(amc =>
        fetch(`https://api.sec.or.th/FundFactsheet/fund/amc/${amc.unique_id}`, {
          headers: { 'Ocp-Apim-Subscription-Key': KEY },
        }).then(r => r.ok ? r.json() : []).catch(() => [])
      )
    );

    const allFunds = fundLists.flat();
    const results = allFunds
      .filter(f =>
        f.fund_status === 'RG' && (
          f.proj_abbr_name?.toLowerCase().includes(keyword) ||
          f.proj_name_th?.includes(keyword) ||
          f.proj_name_en?.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 10)
      .map(f => ({
        proj_id:  f.proj_id,
        abbr:     f.proj_abbr_name,
        name_th:  f.proj_name_th,
        name_en:  f.proj_name_en,
      }));

    // ถ้าค้นแค่ 20 AMC แล้วไม่เจอ → ค้น AMC ที่เหลือ
    if (results.length === 0 && matchedAmcs.length === 0 && amcs.length > 20) {
      const restAmcs = amcs.slice(20);
      const restLists = await Promise.all(
        restAmcs.map(amc =>
          fetch(`https://api.sec.or.th/FundFactsheet/fund/amc/${amc.unique_id}`, {
            headers: { 'Ocp-Apim-Subscription-Key': KEY },
          }).then(r => r.ok ? r.json() : []).catch(() => [])
        )
      );
      const restFunds = restLists.flat();
      const restResults = restFunds
        .filter(f =>
          f.fund_status === 'RG' && (
            f.proj_abbr_name?.toLowerCase().includes(keyword) ||
            f.proj_name_th?.includes(keyword) ||
            f.proj_name_en?.toLowerCase().includes(keyword)
          )
        )
        .slice(0, 10)
        .map(f => ({ proj_id: f.proj_id, abbr: f.proj_abbr_name, name_th: f.proj_name_th, name_en: f.proj_name_en }));
      return { statusCode: 200, headers, body: JSON.stringify(restResults) };
    }

    return { statusCode: 200, headers, body: JSON.stringify(results) };

  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
