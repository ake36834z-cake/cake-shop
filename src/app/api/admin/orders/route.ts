import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-sheets-key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    // 使用您最新的試算表 ID
    const spreadsheetId = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';
    
    // 讀取「工作表1」的資料（或根據您的分頁名稱調整）
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: '工作表1!A:L', 
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ orders: [] });
    }

    // 將二維陣列轉為物件陣列
    const headers = rows[0];
    const orders = rows.slice(1).map((row, index) => {
      const order: any = { id: index };
      headers.forEach((header, i) => {
        order[header] = row[i];
      });
      return order;
    }).reverse(); // 最新的訂單排前面

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('Fetch Orders Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
