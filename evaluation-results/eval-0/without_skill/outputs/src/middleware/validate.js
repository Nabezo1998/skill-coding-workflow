/**
 * バリデーション実行ミドルウェア
 *
 * express-validatorのバリデーション結果を確認し、
 * エラーがあれば 400 を返す。
 */

const { validationResult } = require('express-validator');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: '入力値が不正です',
      errors: formattedErrors,
    });
  }

  return next();
}

module.exports = { validate };
