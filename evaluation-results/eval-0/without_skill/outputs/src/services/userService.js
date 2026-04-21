/**
 * ユーザーサービス
 *
 * ユーザーに関するビジネスロジックを担当する。
 * データストアへの直接依存はこのレイヤーで吸収する。
 */

const { randomUUID } = require('crypto');
const bcrypt = require('bcrypt');
const userStore = require('../models/userStore');

const SALT_ROUNDS = 12;

/**
 * メールアドレスでユーザーを検索する
 * @param {string} email
 * @returns {Object|undefined}
 */
function findByEmail(email) {
  return userStore.findByEmail(email);
}

/**
 * 新規ユーザーを作成する
 *
 * @param {string} email    - メールアドレス（正規化前でも可）
 * @param {string} password - 平文パスワード
 * @returns {Promise<Object>} パスワードハッシュを除いたユーザーオブジェクト
 */
async function createUser(email, password) {
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  userStore.save(newUser);

  // パスワードハッシュは返却しない
  const { passwordHash: _omit, ...publicUser } = newUser;
  return publicUser;
}

module.exports = { findByEmail, createUser };
