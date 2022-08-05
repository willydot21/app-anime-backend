
import express from 'express';
import { getAndDeleteById, getUserById, updateCredential, verifyPassword } from '../models/user/user-services/utils';
import { RequestProps } from '../@types';

const router = express.Router();

router.get('/', async (req: RequestProps, res) => {

  const user = await getUserById(req.user.id);

  res.json({ success: true, data: user }).end();

});

router.put('/update', async (req: RequestProps, res) => {

  const id = req.user.id;

  const verifiedPassword = await verifyPassword(id, req.body.password || '');

  if (verifiedPassword.error) return res.status(403).json(verifiedPassword).end();

  const data = await updateCredential(id, req.body);

  const status = data.error ? 400 : 200;

  return res.status(status).json(data).end();

});

router.delete('/delete', async (req: RequestProps, res) => {

  await getAndDeleteById(req.user.id);

  res.json({ success: true, data: 'Deleted user id: ' + req.user.id }).end();

});

export default router;