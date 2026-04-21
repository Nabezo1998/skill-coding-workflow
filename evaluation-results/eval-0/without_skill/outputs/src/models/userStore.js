/**
 * インメモリ ユーザーストア
 *
 * 本番環境ではこのモジュールをDBアクセス層（PostgreSQL等）に置き換える。
 */

const users = [];

/**
 * 全ユーザーを返す（デバッグ用）
 * @returns {Array}
 */
function findAll() {
  return users;
}

/**
 * メールアドレスでユーザーを検索する
 * @param {string} email
 * @returns {Object|undefined}
 */
function findByEmail(email) {
  return users.find((u) => u.email === email.toLowerCase());
}

/**
 * 新しいユーザーを保存する
 * @param {Object} user - { id, email, passwordHash, createdAt }
 * @returns {Object} 保存されたユーザー
 */
function save(user) {
  users.push(user);
  return user;
}

module.exports = { findAll, findByEmail, save };
