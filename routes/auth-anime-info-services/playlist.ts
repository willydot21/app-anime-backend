
import express from 'express';
import { RequestProps } from '../../@types';
import { addAnimeFollowingPlaylist } from '../../models/user/user-services/following';
import { addAnimeToPlaylist, getPlaylist, removeAnimeFromPlaylist } from '../../models/user/user-services/playlist';

const router = express.Router();

// user playlists
router.get('/', async (req: RequestProps, res) => {

  try {

    const playlists = await getPlaylist(req.user.id, '*');

    return res.json(playlists).end();

  } catch (error) {

    return res.status(500).json({
      error: true,
      data: 'Internal server error: ' + error
    });

  }

});

router.get('/:playlist', async (req: RequestProps, res) => {

  try {

    const playlist = req.params.playlist || '*';

    const playlists = await getPlaylist(req.user.id, playlist);

    res.json(playlists).end();

  } catch (error) {

    return res.status(500).json({
      error: true,
      data: 'Internal server error: ' + error
    });

  }

});

router.post('/:playlist/add', async (req: RequestProps, res) => {

  const playlist = req.params.playlist;

  if (playlist && req.body.name && req.body.id && req.body.poster) {

    await addAnimeFollowingPlaylist(req.body.id, playlist, req.user.id);
    // add anime to following list

    const data = await addAnimeToPlaylist(req.user.id, playlist, req.body);

    return res
      .status(data.success ? 200 : 400)
      .json({ data })
      .end();

  }

  return res.status(400).json({
    error: true,
    data: 'Required params are not passed'
  });

});

router.delete('/:playlist/remove', async (req: RequestProps, res) => {

  const playlist = req.params.playlist;

  if (playlist && req.body.id) {

    await addAnimeFollowingPlaylist(req.body.id, playlist, req.user.id);
    // add remove anime from following list

    const data = await removeAnimeFromPlaylist(req.user.id, playlist, req.body.id);

    return res
      .status(data.success ? 200 : 400)
      .json({ data })
      .end();

  }

  return res.status(400).json({
    error: true,
    data: 'Required params are not passed'
  });

});

export default router;