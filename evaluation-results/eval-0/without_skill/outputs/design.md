# ユーザー登録API 設計書

## 概要

メールアドレスとパスワードを使ったユーザーサインアップAPIを提供する。  
パスワードはbcryptでハッシュ化してDBに保存する。

---

## 技術スタック

| 項目 | 選定技術 |
|------|----------|
| ランタイム | Node.js (v18+) |
| フレームワーク | Express |
| パスワードハッシュ | bcrypt |
| バリデーション | express-validator |
| DB（想定） | PostgreSQL（または任意のDB。本実装はインメモリ配列で代替） |

---

## APIエンドポイント

### POST /api/auth/register

ユーザーを新規登録する。

#### リクエスト

- Content-Type: `application/json`

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### バリデーションルール

| フィールド | ルール |
|-----------|--------|
| email | 必須、メール形式、最大255文字 |
| password | 必須、最小8文字、最大72文字（bcryptの制限） |

#### レスポンス（成功: 201 Created）

```json
{
  "success": true,
  "message": "ユーザー登録が完了しました",
  "data": {
    "id": "uuid-string",
    "email": "user@example.com",
    "createdAt": "2026-04-21T00:00:00.000Z"
  }
}
```

#### レスポンス（バリデーションエラー: 400 Bad Request）

```json
{
  "success": false,
  "message": "入力値が不正です",
  "errors": [
    { "field": "email", "message": "有効なメールアドレスを入力してください" }
  ]
}
```

#### レスポンス（重複エラー: 409 Conflict）

```json
{
  "success": false,
  "message": "このメールアドレスはすでに登録されています"
}
```

#### レスポンス（サーバーエラー: 500 Internal Server Error）

```json
{
  "success": false,
  "message": "サーバーエラーが発生しました"
}
```

---

## セキュリティ設計

- パスワードは **bcrypt（saltRounds=12）** でハッシュ化して保存
- レスポンスにパスワード（平文・ハッシュともに）は含めない
- メールアドレスは登録前に小文字正規化（大文字小文字を同一視）
- バリデーションは入力サニタイズも兼ねる

---

## ディレクトリ構成

```
src/
  app.js              # Expressアプリ本体
  server.js           # サーバー起動エントリポイント
  routes/
    auth.js           # 認証ルーター
  controllers/
    authController.js # ユーザー登録コントローラー
  services/
    userService.js    # ユーザー操作ビジネスロジック
  middleware/
    validate.js       # バリデーションミドルウェア
  models/
    userStore.js      # インメモリユーザーストア（DB代替）
  validators/
    authValidator.js  # リクエストバリデーションルール
```

---

## 処理フロー

```
クライアント
  │
  ▼ POST /api/auth/register
Express Router (auth.js)
  │
  ▼ バリデーション (authValidator.js + validate.js)
  │  NG → 400 Bad Request
  │
  ▼ authController.register()
  │
  ▼ userService.findByEmail()
  │  存在する → 409 Conflict
  │
  ▼ bcrypt.hash(password, 12)
  │
  ▼ userService.create()
  │
  ▼ 201 Created（パスワードを除いたユーザー情報を返す）
```
