import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, items, total, shipping, pickupDate, note } = data;

    // 設定 Google Auth
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-sheets-key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';

    // 格式化品項
    const itemsString = items.map((item: any) => `${item.name} x ${item.quantity}`).join(', ');

    // 準備寫入的資料
    const values = [
      [
        '',                              // 取貨日期 (留空讓您手動填)
        '',                              // 星期
        name,                            // 訂購人
        itemsString,                     // 訂購內容
        new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }), // 下訂日期
        items.reduce((acc: number, item: any) => acc + item.quantity, 0),    // 數量
        total,                           // 金額
        shipping === '自取' ? 0 : shipping === '7-11冷凍' ? 129 : 165,       // 運費
        total,                           // 小計
        '',                              // 收款
        '貨到付款/自取面交',              // 支付方式
        note || '',                      // 備註
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: '工作表1!A:L', // 請確認您的分頁名稱
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Google Sheets Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
