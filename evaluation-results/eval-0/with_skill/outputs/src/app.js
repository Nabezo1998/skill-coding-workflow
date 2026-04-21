const express = require('express');
const authRoutes = require('./routes/auth');

const app = express();

// JSONリクエストボディのパース
app.use(express.json());

// ルート登録
app.use('/api/auth', authRoutes);

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({ error: 'エンドポイントが見つかりません' });
});

// エラーハンドラー
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'サーバーエラーが発生しました' });
});

module.exports = app;
