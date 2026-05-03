import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

const SHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';

// 取得商品列表
export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-sheets-key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:D',
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json({ products: [] });

    const products = rows.slice(1).map(row => ({
      id: row[0],
      name: row[1],
      price: parseInt(row[2]),
      category: row[3]
    }));

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 更新單一商品價格與原價
export async function PATCH(req: Request) {
  try {
    const { id, price, originalPrice } = await req.json();
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-sheets-key.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // 1. 先找出該 ID 在哪一列
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:A',
    });
    const rows = response.data.values;
    const rowIndex = rows?.findIndex(row => row[0] === id);

    if (rowIndex === undefined || rowIndex === -1) {
      throw new Error('找不到該商品');
    }

    // 2. 更新價格 (C 欄) 與 原價 (D 欄)
    // 我們直接更新 C:D 這一區間
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `商品列表!C${rowIndex + 1}:D${rowIndex + 1}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[price, originalPrice || '']]
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
