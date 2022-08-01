
import express from 'express';
import { AnimeEpisodesUpdateParams, RequestProps } from '../@types';
import { addAnimeEpisodeHistory, removeAnimeEpisodeHistory } from '../models/user/user.controller';
import { userPlaylists } from '../services/utils';

const router = express.Router();

router.put('/playlist', (req: RequestProps, res) => {

  const { playlist } = req.body;

  if (userPlaylists.indexOf(playlist)) {

    const userId = req.user.id;


  }

  return res.status(400).json({ error: true, message: 'Query param "playlist" does not exists' }).end();

});

router.post('/episodes/add', async (req: RequestProps, res) => {

  const userId = req.user.id;

  const data: AnimeEpisodesUpdateParams = {
    animeid: req.body.animeid,
    episode: req.body.episode
  };

  if (!(data.animeid || data.episode)) {

    return res.status(400).json({ error: true, data: 'Bad request' });

  }

  const responseData = await addAnimeEpisodeHistory(userId, data);

  const status = responseData.error ? 500 : 200;

  res.status(status).json(responseData);

});

router.delete('/episodes/remove', async (req: RequestProps, res) => {

  const userId = req.user.id;

  const data: AnimeEpisodesUpdateParams = {
    animeid: req.body.animeid,
    episode: req.body.episode || ''
  };

  if (!(data.animeid || data.episode)) {

    return res.status(400).json({ error: true, data: 'Bad request' });

  }

  const responseData = await removeAnimeEpisodeHistory(userId, data);

  const status = responseData.error ? 500 : 200;

  res.status(status).json(responseData);

});

export default router;