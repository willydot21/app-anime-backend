
import express from 'express';
import userHistory from './auth-anime-info-services/history';
import userPlaylist from './auth-anime-info-services/playlist';
import userFollowing from './auth-anime-info-services/following';

const router = express.Router();

router.use('/user-history', userHistory);

router.use('/user-playlist', userPlaylist);

router.use('/following', userFollowing);

export default router;