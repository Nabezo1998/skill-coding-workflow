const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
  console.log(`ユーザー登録API: POST http://localhost:${PORT}/api/auth/register`);
});
