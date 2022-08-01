
import userModel from './user.dao';
import bcryptjs from 'bcryptjs';
import { generateToken, handlerValidateCredentials } from '../../services/utils';
import { CookieOptions, Request, Response } from 'express';
import { AnimeEpisodesUpdateParams } from '../../@types';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  path: '*',
  sameSite: 'lax',
  secure: process.env.PRODUCTION
}

export function createUser(req: Request, res: Response) {

  const {
    username, email, password
  } = req.body;

  const checkCredentials = handlerValidateCredentials(email, password);

  if (checkCredentials !== 'ok') {
    return res.status(409).json(checkCredentials);
  }

  const newUser = {
    username,
    email,
    password: bcryptjs.hashSync(password)
  }

  userModel.create(newUser, (err, user) => {

    if (err && ((err as any).code === 11000)) {
      return res.status(409).json({ error: 'Email already exists.', code: 'EAE409' });
    }
    // checks if email exist.

    if (err) {
      return res.status(500).json({ error: 'Server error', code: 'SE500' });
    }
    // other error.

    const { accessToken, refreshToken } = generateToken(user);

    const data = {
      email: user.email,
      refreshToken
    }

    res.status(200)
      .cookie('auth_token', accessToken, cookieOptions)
      .json({ error: null, data }).end();

  });

}

export async function loginUser(req: Request, res: Response) {

  const {
    email, password
  } = req.body;

  const checkCredentials = handlerValidateCredentials(email, password);

  if (checkCredentials !== 'ok') {
    return res.status(409).json(checkCredentials);
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: 'User is not found.', code: 'UINF404' });
  }

  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ error: 'Incorrect password.', code: 'IPW400' });
  }

  const { accessToken, refreshToken } = generateToken(user);

  const data = {
    email,
    refreshToken
  }

  res.status(200)
    .cookie('auth_token', accessToken, cookieOptions)
    .json({ error: null, data }).end();

}

export async function getUserById(id: string | undefined) {

  const user = await userModel.findById(id || '');

  return user;

}

export async function getAndDeleteById(id: string | undefined) {

  await userModel.findByIdAndDelete(id || '').exec();

}

export async function updateUserPlaylist(
  id: string,
  playlist: string,
  animeid: string,
  action: string
) {

  const query = {
    _id: id,
    [`userAnimeInfo.${playlist}`]: {
      $eq: animeid
    }
  }

  if (action === 'remove') {

    const req = await userModel.updateOne(query, {
      $pull: { [`userAnimeInfo.${playlist}`]: animeid }
    });

    return req;

  } else if (action == 'add') {

    // TODO: re make that but with article schemas. 

  }

}

export async function addAnimeEpisodeHistory(userId: string, data: AnimeEpisodesUpdateParams) {

  const query = {
    _id: userId,
    'userAnimeInfo.animeHistory': {
      $elemMatch: {
        id: data.animeid,
        episodes: {
          $ne: data.episode // find element where data.episode not exists.
        }
      }
    }
  }

  try {

    await userModel.updateOne(query, {
      $push: { 'userAnimeInfo.animeHistory.$.episodes': data.episode }
    });

    return { error: false, data: `User is updated!` };

  } catch (err) { return { error: true, data: err } }

}

export async function removeAnimeEpisodeHistory(userId: string, data: AnimeEpisodesUpdateParams) {

  const query = {
    _id: userId,
    'userAnimeInfo.animeHistory': {
      $elemMatch: {
        id: data.animeid,
        episodes: data.episode // find element where data.episode exists.
      }
    }
  }

  try {

    await userModel.updateOne(query, {
      $pull: { 'userAnimeInfo.animeHistory.$.episodes': data.episode }
    });

    return {
      error: false,
      data: 'User is updated!'
    };

  } catch (err) { return { error: true, data: err } }

}