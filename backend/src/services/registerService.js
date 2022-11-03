import bcrypt from 'bcrypt';
import ApiError from '../error/ApiError';
import User from '../models/User';
import { registerValidation } from '../validation/registerValidation';

export const registerService = {
  async register({ name, email, password }) {
    const { error } = registerValidation({ name, email, password });

    if (error) {
      if (!name && !email && !password) {
        throw new ApiError(400, 'Az összes mező kitöltése kötelező');
      }
      throw new ApiError(400, error.details[0].message);
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new ApiError(400, 'Sajnos ez az email cím már foglalt, kérlek válassz másikat');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      isVerified: false,
    });

    await user.save();
    return {
      id: user._id,
      email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    };
  },
};
