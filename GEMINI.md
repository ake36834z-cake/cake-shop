# SUNSCAKE 蛋糕桑 - 專案備忘錄

## 專案資訊
- **正宗路徑：** `/Users/allensun/Desktop/gemini/cake-shop`
- **部署平台：** Vercel (`cake-shop-indol-rho.vercel.app`)
- **部署方式：** 推送至 GitHub `main` 分支觸發自動部署

## 修改紀錄 (2026-05-04) - 進度補正
1. **Google Sheets 連結：** 已更換新金鑰，並在 v111 版本中徹底封死「檔案路徑」讀取邏輯，改為純環境變數物件讀取，解決 `ENOENT` 錯誤。
2. **[新] v111 部署：** 已推送到 GitHub，等待 Vercel 自動部署完成。
3. **原價功能實作：** 
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
