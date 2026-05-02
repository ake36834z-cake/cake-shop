# SUNS CAKE 專案維護手冊

## 關鍵資訊
- **試算表 ID**: `1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4`
- **Google 金鑰**: `google-sheets-key.json` (位於專案根目錄)
- **管理後台**: `https://sunscakes.netlify.app/admin`

## 後台功能說明
1. **訂單列表**: 從試算表「工作表1」讀取。
2. **商品管理**: 從試算表「商品列表」讀取並編輯。

## 圖片路徑規範
- 單口味主圖: `/public/images/flavors/[口味ID]/main.jpg`
- 禮盒主圖: `/public/images/products/[禮盒ID]/main.jpg`

## 開發筆記
- 由於 Netlify 是唯讀環境，所有需要變動的資料（價格、訂單）都必須透過 Google Sheets 作為資料庫。
- 每次修改程式碼後，需 `git add .`, `git commit`, `git push` 才會更新線上網站。
