
import express from 'express';
import { getAndDeleteById, getUserById } from '../models/user/user.controller';
import { RequestProps } from '../@types';
import { generateRefreshToken } from '../services/utils';

const router = express.Router();

router.get('/', async (req: RequestProps, res) => {

  const user = await getUserById(req.user.id);

  res.json({ success: true, data: user }).end();

});

router.delete('/delete', async (req: RequestProps, res) => {

  await getAndDeleteById(req.user.id);

  res.json({ success: true, data: 'Deleted user id: ' + req.user.id }).end();

});

export default router;