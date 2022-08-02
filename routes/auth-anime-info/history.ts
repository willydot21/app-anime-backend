
import express from 'express';
import { RequestProps, AnimeEpisodesUpdateParams } from '../../@types';
import { addAnimeEpisodeHistory, getUserHistory, removeAnimeEpisodeHistory } from '../../models/user/user-services/history-episodes';

const router = express.Router();

// user history episodes
router.get('/', async (req: RequestProps, res) => {

  try {

    const history = await getUserHistory(req.user.id);

    return res.json(history).end();

  } catch (error) {

    return res.status(500).json({
      error: true,
      data: 'Internal server error: ' + error
    });

  }

})

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