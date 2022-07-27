
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {

  res.cookie('auth_token', '', { expires: new Date(0) });

  res.end();

});

export default router;