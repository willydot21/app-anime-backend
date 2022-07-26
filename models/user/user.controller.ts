
import userModel from './user.dao';
import bcryptjs from 'bcryptjs';
import { generateToken, handlerValidateCredentials } from '../../src/utils';
import { Request, Response } from 'express';

export function createUser (req:Request, res:Response) {

  const {
    username, email, password
  } = req.body;

  const checkCredentials = handlerValidateCredentials(email, password);

  if(checkCredentials!=='ok'){ 
    return res.status(409).json(checkCredentials); 
  }

  const newUser = {
    username, 
    email,
    password: bcryptjs.hashSync(password)
  }

  userModel.create(newUser, (err, user) => {

    if(err && ((err as any).code === 11000)){ 
      return res.status(409).json({ error:'Email already exists.', code:'EAE409' });
    }
    // checks if email exist.

    if(err){ 
      return res.status(500).json({ error:'Server error', code:'SE500' });
    }
    // other error.

    const { accessToken, refreshToken } = generateToken(user);

    const data = {
      email: user.email,
      refreshToken
    }

    res.status(200).cookie('auth_token', accessToken, { 
      httpOnly: true, 
      expires: new Date(Date.now() + 30 * 1000), // 30 seconds
      path: '*',
      sameSite: 'lax',
      secure: false
    }).json({ error:null, data }).end();

  });

}

export async function loginUser (req:Request, res:Response) {

  const {
    email, password
  } = req.body;

  const checkCredentials = handlerValidateCredentials(email, password);

  if(checkCredentials!=='ok'){ 
    return res.status(409).json(checkCredentials); 
  }

  const user = await userModel.findOne({email});

  if(!user){
    return res.status(404).json({ error: 'User is not found.', code:'UINF404' });
  }

  const validPassword = bcryptjs.compareSync(password, user.password);

  if(!validPassword){
    return res.status(400).json({ error: 'Incorrect password.', code:'IPW400' });
  }

  const { accessToken, refreshToken } = generateToken(user);

  const data = {
    email,
    refreshToken
  }

  res.status(200).cookie('auth_token', accessToken, {
    httpOnly: true, 
    expires: new Date(Date.now() + 60 * 5 * 1000), // 5 minutes
    path: '*',
    sameSite: 'lax',
    secure: false
  }).json({ error:null, data }).end();

}

export async function getUserById (id:string | undefined) {
  
  const user = await userModel.findById(id || '');

  return user;

}

export async function getAndDeleteById (id:string | undefined) {

  await userModel.findByIdAndDelete(id || '').exec();
  
}