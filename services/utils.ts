
import { RequestProps } from '../@types/index.js';
import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import userModel from '../models/user/user.dao.js';

const jwt = jsonwebtoken;

const parseCookie = (str: string) => (
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc: any, v: any) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {})
);


export function generateToken(user: any) {

  const accessToken = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
    expiresIn: '30s'
  });

  const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_KEY, {
    expiresIn: '30d'
  });

  return { accessToken, refreshToken }

}

export async function generateRefreshToken(refreshToken: string) {

  const verified = jwt.verify(refreshToken, process.env.REFRESH_KEY);

  if (!(verified as { email: string }).email) {

    throw new Error('Access denied');

  }

  const email = (verified as { email: string }).email;

  const user = await userModel.findOne({
    email
  });

  const newTokens = generateToken(user);

  return newTokens;

}

export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePassword(password: string) {
  return (
    /[A-Z]/.test(password) && // at least one may. case.
    /[a-z]/.test(password) && // at least one min. case
    password.length >= 6
  );
}

export function handlerValidateCredentials(email: string, pass: string) {

  if (!validateEmail(email)) {
    return {
      error: 'Email is not valid , ej: example@gmail.com',
      code: 'EINV409'
    }
  }

  if (!validatePassword(pass)) {
    return {
      error: 'Password is not valid , the password must have at least one uppercase letter, one lowercase letter, one number and its length must be greater than or equal to 6.',
      code: 'PINV409'
    }
  }

  return 'ok';

}

export function verifyToken(req: RequestProps, res: Response, next: NextFunction) {

  try {

    const headerCookie = parseCookie(req.headers['cookie'] || '');

    const token = headerCookie.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied.', code: 'AD403' });
    }

    const verified = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = verified;

    next();

  } catch (err) {

    res.status(400).json({
      error: 'Internal server error, access denied.',
      code: 'AD403'
    });

  }

}

export const userPlaylists = ['watched', 'watching', 'considering', 'animeHistory'];
