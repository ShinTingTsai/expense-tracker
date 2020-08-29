# 家庭記帳本 (Household Budget Book)

一個使用Express 與 Node.js + Express-Handlebars + Mongodb 開發的記帳本小程式
[DEMO](https://enigmatic-hollows-44583.herokuapp.com/)

## 功能 (Features)

- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可以根據支出「類別」、「月份」篩選支出；總金額的計算只會包括被篩選出來的支出總和
- 註冊帳號與登入功能 **(NEW)**

## 安裝與執行步驟 (Install)
- 下載專案到本機
```
git clone https://github.com/ShinTingTsai/expense-tracker.git
```
- 安裝套件
```
npm install
```
- 修改.env.example檔案內容：FACEBOOK_ID、FACEBOOK_SECRET、SESSION_SECRET等欄位需輸入自己的資訊
- 修改.env.example檔案名稱為.env
- 建立種子資料
```
npm run seed
```
- 開啟程式
```
npm run dev
```
- 請至http://localhost:3000開始使用程式

## 測試帳號 (Test Account)
email: user1@example
password: 12345678

## 環境建置與需求 (Built with)
- Node.js v10.15.0
- Express v4.17.1
- Express-Handlebars v4.0.4
- Robo 3T
- bcryptjs: v2.4.3
- body-parser: v1.19.0
- connect-flash: v0.1.1
- dotenv: v8.2.0
- Express-session: v1.17.1
- method-override: v3.0.0
- mongoose: v5.19.14
- passport: v0.4.1
- passport-facebook: v3.0.0
- passport-local: v1.0.0

## 開發人員 (Author)
Shin-Ting Tsai
