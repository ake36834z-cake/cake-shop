from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
import os

def check_sheet_structure():
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
    SERVICE_ACCOUNT_FILE = 'Desktop/gemini/cake-shop/google-sheets-key.json'
    SPREADSHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4'

    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)

    try:
        # 讀取前 5 列來確認標題與內容
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID, 
            range='商品列表!A1:E5').execute()
        rows = result.get('values', [])
        
        print("目前 Sheets 結構如下：")
        for i, row in enumerate(rows):
            print(f"第 {i+1} 列: {row}")
            
    except Exception as e:
        print(f"讀取失敗：{e}")

if __name__ == "__main__":
    check_sheet_structure()
