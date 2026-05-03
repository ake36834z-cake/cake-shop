import requests
import json

url = "http://localhost:3000/api/order" # 這是模擬網址，但在 CLI 環境我改用 API 邏輯直接測試
# 既然我無法直接跑 localhost Server，我改用 Python 直接跑 Google Sheets 寫入邏輯來驗證 key 的有效性

from google.oauth2 import service_account
from googleapiclient.discovery import build

def test_google_sheets():
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    SERVICE_ACCOUNT_FILE = 'Desktop/gemini/cake-shop/google-sheets-key.json'
    SPREADSHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4'

    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)

    # 模擬一筆測試訂單
    test_values = [
        [
            '', '測試', '工程師小助手', '原味戚風 x 1, 巧克力 x 1', 
            '2026/05/03', 2, 640, 0, 640, '', '測試支付', '這是一筆來自 Gemini 的測試訂單'
        ]
    ]
    
    body = {'values': test_values}
    
    try:
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID, 
            range='工作表1!A:L',
            valueInputOption='USER_ENTERED', 
            body=body).execute()
        print(f"成功！已寫入 {result.get('updates').get('updatedCells')} 格資料。")
    except Exception as e:
        print(f"失敗：{e}")

if __name__ == "__main__":
    test_google_sheets()
