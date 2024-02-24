import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import createHttpError from 'http-errors';

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  followers?: string[];
  following?: string[];
  bio?: string;
  _id?: mongoose.Schema.Types.ObjectId;
}

interface UserModel extends mongoose.Model<IUser> {
  signUp(email: string, password: string, username: string, name: string): any;
  login(username: string, password: string): any;
  hashPassword(password: string): any;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default: '',
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.static('hashPassword', async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
});

userSchema.static(
  'signUp',
  async function signUp(email, password, username, name) {
    if (!email || !password || !username || !name) {
      throw createHttpError(400, 'Please fill out all the fields');
    }

    if (!validator.isEmail(email)) throw Error('Please provide valid email');

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) throw createHttpError(409, 'Email or username already existed');

    const hashedPassword = await User.hashPassword(password);

    const user = await new User({
      email,
      password: hashedPassword,
      username,
      name,
    }).save();

    return user;
  }
);

userSchema.static('login', async function login(username, password) {
  if (!username || !password)
    throw createHttpError(400, 'Please fill out username and password');

  const user = await User.findOne({ username }).select('+password');

  if (!user) throw createHttpError(401, 'Incorrect username');

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw createHttpError(401, 'Incorrect password');

  return user;
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
