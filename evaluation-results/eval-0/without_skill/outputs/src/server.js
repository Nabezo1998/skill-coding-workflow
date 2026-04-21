/**
 * サーバー起動スクリプト
 */

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server] ポート ${PORT} でリクエストを受け付けています`);
  console.log(`[server] POST http://localhost:${PORT}/api/auth/register`);
});
