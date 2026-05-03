import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

function getGoogleAuth() {
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS 
    ? JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS)
    : undefined;

  return new google.auth.GoogleAuth({
    credentials,
    keyFile: credentials ? undefined : path.join(process.cwd(), 'google-sheets-key.json'),
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
    console.error('Fetch Orders Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
