# ユーザー登録API 実装TODO

## フェーズ1: プロジェクトセットアップ

- [x] ディレクトリ構成を決定する
- [x] 設計書（design.md）を作成する
- [ ] `npm init -y` でpackage.jsonを生成する
- [ ] 依存パッケージをインストールする
  - `express` - Webフレームワーク
  - `bcrypt` - パスワードハッシュ化
  - `express-validator` - リクエストバリデーション
  - `uuid` - ユーザーID生成
  - `dotenv` - 環境変数管理

## フェーズ2: 基盤ファイルの作成

- [x] `src/models/userStore.js` - インメモリユーザーストア
- [x] `src/services/userService.js` - ユーザー操作ロジック
- [x] `src/validators/authValidator.js` - バリデーションルール定義
- [x] `src/middleware/validate.js` - バリデーション実行ミドルウェア

## フェーズ3: APIエンドポイント実装

- [x] `src/controllers/authController.js` - 登録コントローラー
- [x] `src/routes/auth.js` - 認証ルーター
- [x] `src/app.js` - Expressアプリ設定
- [x] `src/server.js` - サーバー起動スクリプト

## フェーズ4: 品質確認

- [x] エラーハンドリングが全ケースを網羅しているか確認
- [x] パスワードがレスポンスに含まれていないか確認
- [x] バリデーションルールが要件を満たしているか確認
- [ ] 手動テスト（curlコマンド例を用意する）

## テスト用curlコマンド（参考）

```bash
# 正常登録
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'

# バリデーションエラー（メール形式不正）
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","password":"SecurePass123"}'

# バリデーションエラー（パスワード短すぎ）
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"short"}'

# 重複登録
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"AnotherPass456"}'
```

## 将来の拡張候補（スコープ外）

- [ ] JWT発行（ログインAPI）
- [ ] メール確認フロー
- [ ] レートリミット（express-rate-limit）
- [ ] 実DBとの接続（PostgreSQL / MySQL）
- [ ] ユニットテスト（Jest）
