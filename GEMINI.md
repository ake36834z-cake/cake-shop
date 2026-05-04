# SUNSCAKE 蛋糕桑 - 專案備忘錄

## 專案資訊
- **正宗路徑：** `/Users/allensun/Desktop/gemini/cake-shop`
- **部署平台：** Vercel (`cake-shop-indol-rho.vercel.app`)
- **部署方式：** 推送至 GitHub `main` 分支觸發自動部署
## 修改紀錄 (2026-05-04) - 進度補正
1. **Google Sheets 連結：** 修正 v111 中 PATCH 方法未指定工作表名稱的 Bug。在 v112 中已全面加上 `商品列表!` 前綴，確保 ID 搜尋與資料更新能精準定位。
2. **[新] v116 部署：** 為了提升電腦版相容性，將 LINE 傳送連結改回標準 `R/share` 格式。
3. **v115 部署：** 嘗試優化 LINE 導向（oaMessage 測試）。
4. **v114 部署：** 修正經典巧克力圖片重複顯示的問題。
4. **v113 部署：** 在產品詳情頁面加入 IG 參考連結。
5. **原價功能實作：** 
... (略)
    - Google Sheets `商品列表` 標題已更新為 `ID, 商品名稱, 價格, 原價, 分類`。
    - API 端已支援 `originalPrice` (row[3]) 讀寫。
    - 前端與後台均已支援原價顯示與編輯。


## 修改紀錄 (2026-05-03)
1. **首頁大圖：** 更換為 `public/images/hero-main.jpg` (形象圖3)。
2. **IG 圖示：** 更換為彩色圖片版 `public/images/instagram-icon.png`。
3. **後台安全：** 加入密碼驗證頁面 (`sunscake888`)，隱藏入口至 `/admin`。
4. **[重要] v107 修復：** 修正 `src/app/page.tsx` 缺少 `"use client";` 導致的 Vercel 編譯失敗。

## 目前狀態
- **代碼端：** v108 就緒。
- **數據端：** Google Sheets 即時同步中。

## 開發指南
- 修改 Navbar 請至 `src/components/Navbar.tsx`。
- 修改管理後台邏輯請至 `src/app/admin/page.tsx`。
- 修改首頁內容請至 `src/app/page.tsx`。
- 靜態資源（圖片）請放置於 `public/images/`。
