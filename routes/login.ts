import express from 'express'; 
import { loginUser } from '../models/user/user.controller.js';

const router = express.Router();

router.post('/', loginUser);

export default router;