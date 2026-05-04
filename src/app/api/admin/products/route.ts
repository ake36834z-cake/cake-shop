import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4';

function getGoogleAuth() {
  const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!credentialsJson) {
    throw new Error('DEPLOYMENT_V111: GOOGLE_SHEETS_CREDENTIALS 缺失');
  }

  try {
    const credentials = JSON.parse(credentialsJson);

    // 徹底清除所有可能導致檔案讀取的欄位
    const cleanCredentials = {
      client_email: credentials.client_email,
      private_key: credentials.private_key?.replace(/\\n/g, '\n'), // 處理可能的換行符號問題
      project_id: credentials.project_id,
    };

    return new google.auth.GoogleAuth({
      credentials: cleanCredentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (e: any) {
    throw new Error(`JSON 解析失敗: ${e.message}`);
  }
}

export async function GET() {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:E', // 加上工作表名稱確保精確
    });

    const rows = response.data.values;
    if (!rows) return NextResponse.json({ products: [], version: 'v111' });

    const products = rows.slice(1).map(row => {
      const id = row[0];
      const name = row[1];
      const price = parseInt(row[2]) || 0;
      const originalPrice = parseInt(row[3]) || undefined;
      const category = row[4] || '';
      return { id, name, price, originalPrice, category };
    });

    return NextResponse.json({ products, version: 'v111-FIXED-PATH' });
  } catch (error: any) {
    return NextResponse.json({
      error: `🔴 這是 v111 版本 🔴 錯誤訊息: ${error.message}`,
      hint: "如果還噴 ENOENT，請檢查 Vercel Environment Variables 裡面的 JSON 格式是否正確（不要包含 key_file 欄位）"
    }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const { id, price, originalPrice, category } = await req.json();
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: '商品列表!A:E', // 修正：加上工作表名稱
    });
    const rows = response.data.values;
    const rowIndex = rows?.findIndex(row => row[0] === id);

    if (rowIndex === undefined || rowIndex === -1) {
      throw new Error(`找不到 ID: ${id} (在 '商品列表' 工作表中)`);
    }

    // 更新範圍固定為 C 到 E (價格, 原價, 分類)
    // 加上工作表名稱
    const updateRange = `商品列表!C${rowIndex + 1}:E${rowIndex + 1}`;
    const updateValues = [[price, originalPrice || '', category || '']];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: updateValues }
    });

    return NextResponse.json({ success: true, version: 'v112' });
    } catch (error: any) {
    return NextResponse.json({
      error: `PATCH錯誤[v112]: ${error.message}`,
      details: error.response?.data?.error || 'N/A'
    }, { status: 500 });
    }
    }
