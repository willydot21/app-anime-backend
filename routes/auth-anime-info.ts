
import express from 'express';
import userHistory from './auth-anime-info/history';
import userPlaylist from './auth-anime-info/playlist'

const router = express.Router();

router.use('/user-history', userHistory);

router.use('/user-playlist', userPlaylist);

export default router;