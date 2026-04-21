# ユーザー登録API 設計書

## 概要

メールアドレスとパスワードによるユーザー登録機能を提供するREST APIを実装する。
パスワードはbcryptでハッシュ化して安全に保存する。

## 技術スタック

- **ランタイム**: Node.js
- **フレームワーク**: Express
- **パスワードハッシュ**: bcrypt
- **バリデーション**: express-validator
- **データストア**: インメモリ（実装例）/ 本番ではデータベース（例: PostgreSQL）を想定

## エンドポイント設計

### POST /api/auth/register

ユーザーを新規登録するエンドポイント。

**リクエスト**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**レスポンス（成功: 201 Created）**

```json
{
  "message": "ユーザー登録が完了しました",
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "createdAt": "2026-04-21T00:00:00.000Z"
  }
}
```

**レスポンス（バリデーションエラー: 400 Bad Request）**

```json
{
  "errors": [
    { "field": "email", "message": "有効なメールアドレスを入力してください" },
    { "field": "password", "message": "パスワードは8文字以上にしてください" }
  ]
}
```

**レスポンス（重複エラー: 409 Conflict）**

```json
{
  "error": "このメールアドレスはすでに登録されています"
}
```

## バリデーションルール

| フィールド | ルール |
|-----------|--------|
| email     | 必須、有効なメールアドレス形式 |
| password  | 必須、8文字以上、英数字混在推奨 |

## セキュリティ設計

- パスワードは **bcrypt（saltRounds: 10）** でハッシュ化して保存
- レスポンスにパスワードハッシュは含めない
- メールアドレスの重複チェックを実施

## ファイル構成

```
src/
├── app.js                  # Expressアプリケーション設定
├── server.js               # サーバー起動エントリポイント
├── routes/
│   └── auth.js             # 認証関連ルート定義
├── controllers/
│   └── authController.js   # 認証コントローラー
├── middleware/
│   └── validation.js       # バリデーションミドルウェア
└── models/
    └── userStore.js        # ユーザーデータ管理（インメモリ）
package.json
```

## 処理フロー

```
クライアント
    │
    ▼
POST /api/auth/register
    │
    ▼
バリデーションミドルウェア（email形式・password長さチェック）
    │ NG → 400 Bad Request
    ▼ OK
authController.register()
    │
    ▼
メールアドレス重複チェック
    │ 重複 → 409 Conflict
    ▼ なし
bcrypt.hash(password, 10)
    │
    ▼
ユーザーデータ保存（id, email, passwordHash, createdAt）
    │
    ▼
201 Created（idとemailのみ返却）
```
