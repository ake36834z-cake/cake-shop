import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';

// 取得認證物件 - 僅使用環境變數
function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!credentialsJson) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS 缺失');
  }
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(credentialsJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function GET() {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    // 讀取 A 到 E 欄位 (E 可能放類別)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:E',
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json({ products: [] });

    // 排除標題列，映射資料
    const products = rows.slice(1).map(row => ({
      id: row[0],
      name: row[1],
      price: parseInt(row[2]) || 0,
      originalPrice: row[3] ? parseInt(row[3]) : undefined,
      category: row[4] || '' // 分類移到 E 欄
    }));

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, price, originalPrice } = await req.json();
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:A',
    });
    const rows = response.data.values;
    const rowIndex = rows?.findIndex(row => row[0] === id);

    if (rowIndex === undefined || rowIndex === -1) {
      throw new Error('找不到該商品');
    }

    // 更新 C 欄 (價格) 與 D 欄 (原價)
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
