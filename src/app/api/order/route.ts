import { google } from 'googleapis';
import { NextResponse } from 'next/server';

function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!credentialsJson) {
    throw new Error('系統錯誤：GOOGLE_SHEETS_CREDENTIALS 環境變數缺失。');
  }
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(credentialsJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, items, total, shipping, note } = data;

    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';

    const itemsString = items.map((item: any) => `${item.name} x ${item.quantity}`).join(', ');

    const values = [
      [
        '', '', name, itemsString,
        new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' }),
        items.reduce((acc: number, item: any) => acc + item.quantity, 0),
        total,
        shipping === '自取' ? 0 : shipping === '7-11冷凍' ? 129 : 165,
        total, '', '貨到付款/自取面交', note || ''
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: '工作表1!A:L',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Google Sheets Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
