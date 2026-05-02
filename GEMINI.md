# SUNS CAKE 專案維護手冊

## 關鍵資訊
- **試算表 ID**: `1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4`
- **Google 金鑰**: `google-sheets-key.json` (位於專案根目錄)
- **管理後台**: `https://sunscakes.netlify.app/admin`

## 🔄 對話紀錄與進度追蹤 (重要：請每次讀取)

### 2026-05-02 作業進度
- [x] **圖片補齊**：已從桌面搬運所有口味的主圖與細節圖，並修正檔名空格問題。
- [x] **Git 部署**：已將所有圖片推送到 GitHub，Netlify 線上版已更新。
- [x] **後台功能 1.0**：實作了 `admin` 介面，可切換「商品管理」與「訂單列表」。
- [x] **試算表連結**：已將網站連結至新試算表 `1K4cyhSkg5Fp6FeFIf0P6ezAV5dYHufIm5IKW1gdfBh4`。
- [x] **實體編輯功能**：已建立 `api/admin/products`，現在後台改價格會直接寫入試算表的「商品列表」分頁。

### 待辦事項 (Pending)
- [ ] **前台價格連動**：目前官網首頁可能還是讀取 `cakes.ts` 的靜態價格，需要改為從 API 抓取。
- [ ] **圖片上傳功能**：目前後台只能改文字，未來可以加入直接上傳圖片到 GitHub 的功能。

---

## 圖片路徑規範
- 單口味主圖: `/public/images/flavors/[口味ID]/main.jpg`
- 禮盒主圖: `/public/images/products/[禮盒ID]/main.jpg`

## 開發筆記
- 由於 Netlify 是唯讀環境，所有需要變動的資料（價格、訂單）都必須透過 Google Sheets 作為資料庫。
- 每次修改程式碼後，需 `git add .`, `git commit`, `git push` 才會更新線上網站。
