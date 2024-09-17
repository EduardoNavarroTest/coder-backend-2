import { Router } from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller.js';

const router = Router();

router.post('/register',userController.registerUser);
router.post('/login', userController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), userController.current);
router.post('/logout', userController.logout);


export default router;