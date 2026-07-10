
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// 👈 كنجيبو الحراس لي صاوبنا ف الفيشي د auth.middleware
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// 🌍 1. تسجيل الدخول (Login) -> ممر عام (Public) أي واحد يقدر يدخل ليه بلا توكن
router.post('/login', authController.login);

// 🔒 2. التسجيل (Register) -> مقفول بسوارت غلاظ: خاص يكون مسجل (authenticate) وعندو دور admin بووووحدو!
router.post('/register', authenticate, authorize('admin'), authController.register);

// 👤 3. البروفايل (Get Me) -> خاصو غير التوكن (authenticate) كيفما كان الدور ديالو باش يشوف حسابو
router.get('/me', authenticate, authController.getMe);

module.exports = router;