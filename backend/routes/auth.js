// routes/auth.js 
import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Local register/login & logout
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// SSO Google
router.get('/google', authController.googleRedirect);
router.get('/google/callback', authController.googleCallback);

// SSO Microsoft
router.get('/microsoft', authController.microsoftRedirect);
router.get('/microsoft/callback', authController.microsoftCallback);

// Profil user yang sedang login (ambil dari JWT/cookie)
router.get('/me', requireAuth, authController.getMe);

export default router; 
