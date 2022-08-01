
import express from 'express';
import { updateUserPlaylist } from '../models/user/user.controller';

const router = express.Router();

router.get('/:playlist', async (req, res) => {

  const playlist = req.params.playlist;

  const userid = '62e2e63ecca8b7774a283638';

  const data = await updateUserPlaylist(userid, playlist, 'steingates', 'remove');

  res.json({ data }).end();

});

export default router;