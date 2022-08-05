
import bcryptjs from 'bcryptjs';
import { validatePassword } from "../../../services/utils";
import userModel from "../user.dao";

export async function verifyPassword(userId: string, password: string) {

  const user = await userModel.findById(userId);

  const validPassword = bcryptjs.compareSync(password, user.password);

  if (!validPassword) return { error: true, data: 'Access denied, invalid password' }

  return { error: false, data: 'Ok!, password is correct' };

}

export async function updateCredential(
  userId: string,
  body: { password: string, credential: { name: string, value: string } }
) {

  const internalError = 'Internal exception has been ocurred';
  const passwordError = 'Password is not valid, the password must have at least one uppercase letter, one lowercase letter, one number and its length must be greater than or equal to 6.';
  const usernameError = 'username is not valid, the username muth have at least one character';

  const { name, value } = body.credential;

  if ((name === 'password') || (name === 'username')) {

    const credentialValidationError = name === 'password'
      ? validatePassword(value) ? true : passwordError
      : value.length > 0 ? true : usernameError;

    try {

      if (!credentialValidationError) throw new Error(credentialValidationError);

      await userModel.findByIdAndUpdate(userId, { [name]: bcryptjs.hashSync(value) });

      return { success: true, data: `User ${name} is updated successfully!` }

    } catch (err) { return { error: true, data: (err as Error).message || internalError } }

  }

  return { error: true, data: 'Credentials passed are not valid' }

}

export async function getUserById(id: string | undefined) {

  const user = await userModel.findById(id || '');

  return user;

}

export async function getAndDeleteById(id: string | undefined) {

  await userModel.findByIdAndDelete(id || '').exec();

}