# ユーザー登録API 実装ワークフロー記録

## 作業概要

メールアドレス＋パスワードでサインアップできるユーザー登録APIを、Node.js + Expressで実装した。
パスワードはbcrypt（saltRounds=12）でハッシュ化する。

---

## STEP 1: 設計書の作成（design.md）

設計書では以下を定義した：

- 技術スタック（Express / bcrypt / express-validator）
- APIエンドポイント仕様（POST /api/auth/register）
- リクエスト・レスポンスのJSONスキーマ
- バリデーションルール（email: 必須/メール形式/最大255文字, password: 必須/8-72文字）
- セキュリティ設計（パスワードをレスポンスに含めない、メール正規化）
- ディレクトリ構成
- 処理フロー図

---

## STEP 2: TODO整理（todo.md）

実装タスクをフェーズ別に整理した：

1. プロジェクトセットアップ（package.json, 依存パッケージ）
2. 基盤ファイル（モデル・サービス・バリデーター・ミドルウェア）
3. APIエンドポイント実装（コントローラー・ルーター・アプリ・サーバー）
4. 品質確認（エラーハンドリング、セキュリティチェック、テスト用curlコマンド）

---

## STEP 3: 実装

### 作成ファイル一覧

| ファイル | 役割 |
|---------|------|
| `package.json` | 依存パッケージ定義 |
| `src/server.js` | サーバー起動エントリポイント |
| `src/app.js` | Expressアプリ設定・ルーター登録・エラーハンドラー |
| `src/routes/auth.js` | 認証ルーター（/api/auth にマウント） |
| `src/controllers/authController.js` | ユーザー登録コントローラー |
| `src/services/userService.js` | ユーザー作成ビジネスロジック・bcryptハッシュ化 |
| `src/models/userStore.js` | インメモリユーザーストア |
| `src/validators/authValidator.js` | express-validatorルール定義 |
| `src/middleware/validate.js` | バリデーション結果チェックミドルウェア |

### 実装のポイント

**パスワードのハッシュ化**
```js
// src/services/userService.js
const SALT_ROUNDS = 12;
const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
```
saltRoundsを12に設定し、十分な計算コストを確保した。

**パスワードをレスポンスに含めない**
```js
// パスワードハッシュはオブジェクト分割代入で除外
const { passwordHash: _omit, ...publicUser } = newUser;
return publicUser;
```

**メールアドレスの正規化**
```js
// 大文字小文字の差異を吸収
const normalizedEmail = email.toLowerCase().trim();
```

**バリデーションルール**
```js
body('email').isEmail().isLength({ max: 255 })
body('password').isLength({ min: 8, max: 72 }) // max: bcryptの制約
```

**エラーレスポンスの一貫性**

全ケース（400/409/500）で統一フォーマット `{ success, message, errors? }` を返す。

---

## STEP 4: 使い方

### インストール

```bash
npm install
```

### 起動

```bash
npm start          # 本番起動
npm run dev        # nodemonで開発起動
```

### テスト（curlコマンド）

```bash
# 正常登録 → 201
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'

# バリデーションエラー（メール形式不正）→ 400
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","password":"SecurePass123"}'

# バリデーションエラー（パスワード短すぎ）→ 400
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"short"}'

# 重複登録 → 409
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"AnotherPass456"}'
```

---

## セキュリティ確認チェックリスト

- [x] パスワードは平文で保存していない（bcryptハッシュ化済み）
- [x] パスワード（平文・ハッシュとも）はレスポンスに含めていない
- [x] メールアドレスは小文字正規化している
- [x] バリデーションでSQL Injectionなどの悪意ある入力を弾く（express-validatorのサニタイズ）
- [x] bcryptのsaltRoundsは12（十分な計算コスト）
- [x] パスワード上限72文字（bcryptの内部制限に合わせた設計）

---

## 将来の拡張ポイント

- JWT発行によるログインAPI実装
- メールアドレス確認フロー（確認メール送信）
- レートリミット（express-rate-limit）によるブルートフォース対策
- 実DB（PostgreSQL等）への接続
- Jest等によるユニットテスト・統合テスト
