const { body, validationResult } = require('express-validator');

/**
 * ユーザー登録のバリデーションルール
 */
const registerValidationRules = [
  body('email')
    .notEmpty().withMessage('メールアドレスは必須です')
    .isEmail().withMessage('有効なメールアドレスを入力してください')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('パスワードは必須です')
    .isLength({ min: 8 }).withMessage('パスワードは8文字以上にしてください'),
];

/**
 * バリデーション結果を確認し、エラーがあれば 400 を返すミドルウェア
 */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
}

module.exports = { registerValidationRules, validate };
