const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const userStore = require('../models/userStore');

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * ユーザー登録コントローラー
 */
async function register(req, res) {
  try {
    const { email, password } = req.body;

    // メールアドレスの重複チェック
    const existingUser = userStore.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'このメールアドレスはすでに登録されています',
      });
    }

    // パスワードをbcryptでハッシュ化
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // ユーザーを保存
    const newUser = {
      id: uuidv4(),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    userStore.save(newUser);

    // パスワードハッシュを除いてレスポンスを返す
    return res.status(201).json({
      message: 'ユーザー登録が完了しました',
      user: {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return res.status(500).json({
      error: 'サーバーエラーが発生しました',
    });
  }
}

module.exports = { register };
