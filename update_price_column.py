from google.oauth2 import service_account
from googleapiclient.discovery import build
import os

def check_and_add_column():
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    # 使用正確的絕對路徑
    SERVICE_ACCOUNT_FILE = '/Users/allensun/Desktop/gemini/cake-shop/google_credentials.json'
    SPREADSHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4'
    RANGE_NAME = '商品列表!A1:E1'

    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)

    # 1. 讀取標題列
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
    values = result.get('values', [])

    if not values:
        print("找不到資料或工作表名稱錯誤")
        return

    headers = values[0]
    print(f"目前標題列: {headers}")

    # 2. 檢查是否已有 '原價'
    if '原價' not in headers:
        print("正在加入 '原價' 欄位...")
        # 我們把 '原價' 插在第三個位置 (索引 2 是 價格, 索引 3 插 原價)
        new_headers = ['ID', '商品名稱', '價格', '原價', '分類']
        body = {'values': [new_headers]}
        sheet.values().update(
            spreadsheetId=SPREADSHEET_ID, 
            range='商品列表!A1:E1',
            valueInputOption='USER_ENTERED', 
            body=body).execute()
        print("成功更新標題列為: ID, 商品名稱, 價格, 原價, 分類")
    else:
        print("標題列中已有 '原價'，不需重複動作。")

if __name__ == "__main__":
    check_and_add_column()
