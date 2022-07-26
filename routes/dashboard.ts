
import express from 'express';
import { getAndDeleteById, getUserById } from '../models/user/user.controller';
import { RequestProps } from '../@types';

const router = express.Router();

router.get('/',(req:RequestProps, res) => {

  res.json({
    error: null,
    data: {
      message: 'This route is private.',
      user: req.user
    }
  });

});

router.get('/profile', async (req:RequestProps, res) => {

  const user = await getUserById(req.user.id);

  res.json({
    error: null,
    data: user
  });

});

router.post('/profile', async (req:RequestProps, res) => {

  const user = await getUserById(req.user.id);

});

router.delete('/profile', async (req:RequestProps, res) => {

  await getAndDeleteById(req.user.id);

  res.json({
    success:true,
    data:'Deleted user id: '+req.user.id
  }).end();

});

export default router;