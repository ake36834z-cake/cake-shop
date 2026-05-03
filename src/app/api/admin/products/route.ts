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
    
    // 不指定分頁名稱，預設讀取第一個分頁
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'A:E', 
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json({ products: [] });

    const products = rows.slice(1).map(row => {
      const id = row[0];
      const name = row[1];
      const price = parseInt(row[2]) || 0;
      
      let originalPrice: number | undefined = undefined;
      let category = '';

      const col3Value = row[3] || '';
      const isCol3Numeric = !isNaN(Number(col3Value)) && col3Value !== '';

      if (isCol3Numeric) {
        originalPrice = parseInt(col3Value);
        category = row[4] || '';
      } else {
        category = col3Value;
        originalPrice = undefined;
      }

      return { id, name, price, originalPrice, category };
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, price, originalPrice, category } = await req.json();
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // 先抓取目前所有資料
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'A:E',
    });
    const rows = response.data.values;
    const rowIndex = rows?.findIndex(row => row[0] === id);

    if (rowIndex === undefined || rowIndex === -1) {
      throw new Error(`找不到商品 ID: ${id}`);
    }

    const currentRow = rows![rowIndex];
    const col3Value = currentRow[3] || '';
    const isCol3Numeric = !isNaN(Number(col3Value)) && col3Value !== '';

    let updateRange = '';
    let updateValues = [];

    // 這裡我們不加分頁名稱，讓它更新預設分頁
    if (isCol3Numeric || currentRow.length > 4) {
      updateRange = `C${rowIndex + 1}:E${rowIndex + 1}`;
      updateValues = [[price, originalPrice || '', category || currentRow[4] || '']];
    } else {
      updateRange = `C${rowIndex + 1}:E${rowIndex + 1}`;
      updateValues = [[price, originalPrice || '', category || col3Value || '']];
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: updateValues
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ 
      error: `更新失敗: ${error.message}`,
      details: error.response?.data?.error || 'N/A'
    }, { status: 500 });
  }
}
