
import express from 'express';
import { RequestProps } from '../../@types';
import { getFollowingAnime, getFollowingList } from '../../models/user/user-services/following';

const router = express.Router();

router.get('/', async (req: RequestProps, res) => {

  const userId = req.user.id;

  const followingList = await getFollowingList(userId);

  const status = followingList.error ? 400 : 200;

  res.status(status).json(followingList).end();

});

router.get('/:id', async (req: RequestProps, res) => {

  const userId = req.user.id;

  const animeId = req.params.id;

  const followingList = await getFollowingAnime(userId, animeId);

  const status = followingList.error ? 400 : 200;

  res.status(status).json(followingList).end();

});

export default router;