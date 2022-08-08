
import mongoose from 'mongoose';
import userSchema from '../../schemas/user';

userSchema.statics = {
  create: async function (data, callback) {
    const user = new this(data);
    await user.save(callback);
  }
}

const userModel = mongoose.model('User', userSchema);

export default userModel;