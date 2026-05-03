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
    const products = rows.slice(1).map(row => {
      const id = row[0];
      const name = row[1];
      const price = parseInt(row[2]) || 0;
      
      let originalPrice: number | undefined = undefined;
      let category = '';

      // 防呆邏輯：判斷 D 欄 (row[3]) 是原價還是分類
      const col3Value = row[3] || '';
      const isCol3Numeric = !isNaN(Number(col3Value)) && col3Value !== '';

      if (isCol3Numeric) {
        // 如果 D 欄是數字，它是原價
        originalPrice = parseInt(col3Value);
        category = row[4] || ''; // 分類在 E 欄
      } else {
        // 如果 D 欄不是數字，它是分類 (舊結構)
        category = col3Value;
        originalPrice = undefined; // 原價尚未設定
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

    // 1. 先抓取目前的資料，確認 rowIndex 並保留分類資訊
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:E',
    });
    const rows = response.data.values;
    const rowIndex = rows?.findIndex(row => row[0] === id);

    if (rowIndex === undefined || rowIndex === -1) {
      throw new Error('找不到該商品');
    }

    const currentRow = rows![rowIndex];
    // 判斷目前的結構
    const col3Value = currentRow[3] || '';
    const isCol3Numeric = !isNaN(Number(col3Value)) && col3Value !== '';

    let updateRange = '';
    let updateValues = [];

    if (isCol3Numeric || currentRow.length > 4) {
      // 已經是新結構 (A:E)
      updateRange = `商品列表!C${rowIndex + 1}:E${rowIndex + 1}`;
      updateValues = [[price, originalPrice || '', category || currentRow[4] || '']];
    } else {
      // 還是舊結構 (A:D)，我們順便幫它升級成新結構 (A:E)
      updateRange = `商品列表!C${rowIndex + 1}:E${rowIndex + 1}`;
      updateValues = [[price, originalPrice || '', category || col3Value || '']];
    }

    // 更新資料
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
