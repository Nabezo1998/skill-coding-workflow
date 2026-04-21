/**
 * 認証コントローラー
 */

const userService = require('../services/userService');

/**
 * ユーザー登録
 *
 * POST /api/auth/register
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function register(req, res) {
  try {
    const { email, password } = req.body;

    // メールアドレスの重複チェック
    const existing = userService.findByEmail(email);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'このメールアドレスはすでに登録されています',
      });
    }

    // ユーザー作成（bcryptハッシュ化はserviceで実施）
    const newUser = await userService.createUser(email, password);

    return res.status(201).json({
      success: true,
      message: 'ユーザー登録が完了しました',
      data: newUser,
    });
  } catch (err) {
    console.error('[register] 予期しないエラー:', err);
    return res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました',
    });
  }
}

module.exports = { register };
