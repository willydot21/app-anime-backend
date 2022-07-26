
import { RequestProps } from '../@types/index.js';
import { NextFunction, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import properties from '../services/properties.js';

const jwt = jsonwebtoken;

const __KEY = "pw>9x5~'=NC%NW-(";

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
  const accessToken = jwt.sign({ id: user._id }, __KEY, {
    expiresIn: '1m' // 1 minute 
  });
  const refreshToken = jwt.sign({ email: user.email }, properties.__REFRESH_KEY, {
    expiresIn: '30d'
  });
  return {
    accessToken,
    refreshToken
  };
}

export function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePassword(password: string) {
  return (
    /[A-Z]/.test(password) && // at least one may. case.
    /[a-z]/.test(password) && // at least one min. case
    /[0-9]/.test(password) && // at least one number case.
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

    const headerSetCookie = req.header('Set-Cookie');

    const cookies: string[] = Array.isArray(headerSetCookie)
      ? headerSetCookie
      : [];

    const token = parseCookie(cookies[0]).auth_token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied.', code: 'AD403' });
    }

    const verified = jwt.verify(token, __KEY);

    req.user = verified;

    next();

  } catch (err) {

    res.status(400).json({
      error: 'Internal server error, access denied.',
      code: 'AD403'
    });

  }

}