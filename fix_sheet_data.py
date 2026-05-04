from google.oauth2 import service_account
from googleapiclient.discovery import build

def fix_data_alignment():
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    SERVICE_ACCOUNT_FILE = '/Users/allensun/Desktop/gemini/cake-shop/google_credentials.json'
    SPREADSHEET_ID = '1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4'
    
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()

    # 1. 讀取所有資料 (從第 2 行開始，因為第 1 行是標題)
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range='商品列表!A2:E').execute()
    rows = result.get('values', [])

    if not rows:
        print("沒有資料可修復")
        return

    updated_rows = []
    for row in rows:
        # row[0]: ID, row[1]: 名稱, row[2]: 價格
        # 舊的資料中，row[3] 是分類名稱 (如：適合小朋友)
        # 我們要把 row[3] 搬到 row[4] (分類)，並把 row[3] (原價) 設為空
        
        id_val = row[0]
        name_val = row[1]
        price_val = row[2]
        
        # 判斷 row[3] 是否為文字（分類）
        col3_val = row[3] if len(row) > 3 else ""
        
        # 如果 row[3] 不是數字，代表它是被搬錯位的「分類」
        try:
            float(col3_val)
            # 如果是數字，保持原樣
            original_price = col3_val
            category = row[4] if len(row) > 4 else ""
        except ValueError:
            # 如果不是數字，代表是分類名稱
            original_price = "" 
            category = col3_val
            
        updated_rows.append([id_val, name_val, price_val, original_price, category])

    # 2. 寫回 Sheets
    body = {'values': updated_rows}
    sheet.values().update(
        spreadsheetId=SPREADSHEET_ID, 
        range='商品列表!A2:E',
        valueInputOption='USER_ENTERED', 
        body=body).execute()
    print(f"成功修正 {len(updated_rows)} 筆資料的欄位對齊！")

if __name__ == "__main__":
    fix_data_alignment()
