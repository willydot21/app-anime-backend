
import express from 'express';
import { RequestProps } from '../@types';
import { cookieOptions } from '../models/user/user.controller';
import { generateRefreshToken } from '../services/utils';

const router = express.Router();

router.post('/', async (req: RequestProps, res) => {

  if (req.body.refreshToken) {

    try {

      const { refreshToken, accessToken } = await generateRefreshToken(req.body.refreshToken);

      return res
        .cookie('auth_token', accessToken, cookieOptions)
        .json({ success: true, data: { refreshToken } })
        .end();

    } catch (err) {

      return res.status(403).json({ error: true, data: 'Access denied' }).end();

    }

  }

  return res.status(403).json({ error: true, data: 'Access denied' }).end();

});

export default router;