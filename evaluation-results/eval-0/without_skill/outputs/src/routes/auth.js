/**
 * 認証ルーター
 *
 * マウント先: /api/auth
 */

const { Router } = require('express');
const { register } = require('../controllers/authController');
const { registerValidationRules } = require('../validators/authValidator');
const { validate } = require('../middleware/validate');

const router = Router();

// POST /api/auth/register
router.post('/register', registerValidationRules, validate, register);

module.exports = router;
