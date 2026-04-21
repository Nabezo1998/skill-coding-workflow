/**
 * インメモリのユーザーデータストア
 * 本番環境ではデータベース（PostgreSQLなど）に置き換える
 */

const users = [];

const userStore = {
  /**
   * メールアドレスでユーザーを検索する
   * @param {string} email
   * @returns {object|undefined}
   */
  findByEmail(email) {
    return users.find((u) => u.email === email);
  },

  /**
   * 新しいユーザーを保存する
   * @param {object} user - { id, email, passwordHash, createdAt }
   * @returns {object} 保存したユーザー
   */
  save(user) {
    users.push(user);
    return user;
  },

  /**
   * 全ユーザーを取得する（デバッグ用）
   * @returns {object[]}
   */
  findAll() {
    return users.map(({ passwordHash, ...rest }) => rest);
  },
};

module.exports = userStore;
