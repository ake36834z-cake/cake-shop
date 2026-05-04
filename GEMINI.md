# SUNSCAKE 蛋糕桑 - 專案備忘錄

## 專案資訊
- **正宗路徑：** `/Users/allensun/Desktop/gemini/cake-shop`
- **部署平台：** Vercel (`cake-shop-indol-rho.vercel.app`)
- **部署方式：** 推送至 GitHub `main` 分支觸發自動部署

## 修改紀錄 (2026-05-04) - 進度補正
1. **Google Sheets 連結：** 已經更換全新金鑰，確認 `google_credentials.json` 連線正常，不再噴 `account not found`。
2. **原價功能實作：** 
    - Google Sheets `商品列表` 標題已更新為 `ID, 商品名稱, 價格, 原價, 分類`。
    - API 端 (`app/api/admin/products/route.ts`) 已支援 `originalPrice` 讀取與寫入。
    - 前端 `ProductCard.tsx` 與 `products/[id]/page.tsx` 已加入 `line-through` 刪節線顯示原價。
    - 後台管理 (`app/admin/page.tsx`) 已加入原價編輯欄位。
3. **部署準備：** 代碼已在本地驗證完成。

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
