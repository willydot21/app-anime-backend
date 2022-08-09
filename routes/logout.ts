
import express from 'express';
import { cookieOptions } from '../models/user/user.controller';

const router = express.Router();

router.get('/', (req, res) => {

  res.cookie('auth_token', '', { expires: new Date(0), ...cookieOptions });

  res.end();

});

export default router;