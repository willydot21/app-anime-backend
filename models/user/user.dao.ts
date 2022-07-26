
import mongoose from 'mongoose';
import userSchema from '../../schemas/user';

userSchema.statics = {
  create: async function(data, cb) {
    // cb is callback
    const user = new this(data);
    await user.save(cb);
  }
}

const userModel = mongoose.model('User', userSchema);

export default userModel;