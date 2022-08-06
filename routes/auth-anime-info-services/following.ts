
import express from 'express';
import { RequestProps } from '../../@types';
import { getFollowingList } from '../../models/user/user-services/following';

const router = express.Router();

router.get('/', async (req: RequestProps, res) => {

  const userId = req.user.id;

  const followingList = await getFollowingList(userId);

  const status = followingList.error ? 400 : 200;

  res.status(status).json(followingList).end();

});

export default router;