/**
 * 認証リクエストのバリデーションルール
 */

const { body } = require('express-validator');

/**
 * ユーザー登録リクエストのバリデーションルール
 */
const registerValidationRules = [
  body('email')
    .notEmpty()
    .withMessage('メールアドレスは必須です')
    .isEmail()
    .withMessage('有効なメールアドレスを入力してください')
    .isLength({ max: 255 })
    .withMessage('メールアドレスは255文字以内で入力してください')
    .normalizeEmail({ gmail_remove_dots: false }),

  body('password')
    .notEmpty()
    .withMessage('パスワードは必須です')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上で入力してください')
    .isLength({ max: 72 })
    .withMessage('パスワードは72文字以内で入力してください'),
];

module.exports = { registerValidationRules };
