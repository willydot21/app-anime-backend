
import express from 'express';
import { getAndDeleteById, getUserById, updateById } from '../models/user/user.controller';
import { RequestProps } from '../@types';

const router = express.Router();

router.get('/',(req:RequestProps, res) => {

  res.json({
    error: null,
    data: {
      message: 'This route is private.',
      user: req.user
    }
  }).end();

});

router.get('/user', async (req:RequestProps, res) => {

  const user = await getUserById(req.user.id);

  res.json({
    error: null,
    data: user
  }).end();

});

router.delete('/user', async (req:RequestProps, res) => {

  await getAndDeleteById(req.user.id);

  res.json({
    success:true,
    data:'Deleted user id: '+req.user.id
  }).end();

});

export default router;