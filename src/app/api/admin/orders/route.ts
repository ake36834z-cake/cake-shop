import { google } from 'googleapis';
import { NextResponse } from 'next/server';

function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!credentialsJson) {
    throw new Error('系統錯誤：GOOGLE_SHEETS_CREDENTIALS 環境變數缺失。');
  }
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(credentialsJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

export async function GET() {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: '工作表1!A:L', 
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ orders: [] });
    }

    const headers = rows[0];
    const orders = rows.slice(1).map((row, index) => {
      const order: any = { id: index };
      headers.forEach((header, i) => {
        order[header] = row[i];
      });
      return order;
    }).reverse();

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Fetch Orders Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
