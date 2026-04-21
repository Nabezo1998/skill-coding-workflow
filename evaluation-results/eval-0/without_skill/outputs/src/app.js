/**
 * Express アプリケーション設定
 */

const express = require('express');
const authRouter = require('./routes/auth');

const app = express();

// JSONボディパーサー
app.use(express.json());

// ルーター登録
app.use('/api/auth', authRouter);

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'エンドポイントが見つかりません',
  });
});

// グローバルエラーハンドラー
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[global error handler]', err);
  res.status(500).json({
    success: false,
    message: 'サーバーエラーが発生しました',
  });
});

module.exports = app;
