// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Local register/login & logout
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout) 


// SSO Google
router.get('/google', authController.googleRedirect);
router.get('/google/callback', authController.googleCallback);

// SSO Microsoft
router.get('/microsoft', authController.microsoftRedirect);
router.get('/microsoft/callback', authController.microsoftCallback);

// Profil user yang sedang login (ambil dari JWT/cookie)
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
