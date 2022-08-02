
import userModel from "../user.dao";

export async function getUserById(id: string | undefined) {

  const user = await userModel.findById(id || '');

  return user;

}

export async function getAndDeleteById(id: string | undefined) {

  await userModel.findByIdAndDelete(id || '').exec();

}