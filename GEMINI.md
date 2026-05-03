# SUNSCAKE 蛋糕桑 - 專案備忘錄

## 專案資訊
- **正宗路徑：** `/Users/allensun/Desktop/gemini/cake-shop`
- **部署平台：** Vercel (`cake-shop-indol-rho.vercel.app`)
- **部署方式：** 推送至 GitHub `main` 分支觸發自動部署

## 修改紀錄 (2026-05-03)
1. **首頁大圖：** 更換為 `public/images/hero-main.jpg` (形象圖3)。
2. **IG 圖示：** 更換為彩色圖片版 `public/images/instagram-icon.png`。
3. **後台安全：**
    - 加入密碼驗證頁面，預設密碼為 `sunscake888`。
    - 從 Navbar 移除「管理後台」連結，入口現為隱藏狀態（直接訪問 `/admin`）。
4. **環境大掃除：** 清理舊有的 `Desktop/hello` 測試資料夾。

## 開發指南
- 修改 Navbar 請至 `src/components/Navbar.tsx`。
- 修改管理後台邏輯請至 `src/app/admin/page.tsx`。
- 修改首頁內容請至 `src/app/page.tsx`。
- 靜態資源（圖片）請放置於 `public/images/`。
