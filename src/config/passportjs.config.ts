import { Strategy, VerifyFunction } from 'passport-local';
import User from '../models/User';
import { validatePasswordSync } from '../utils/auth';

const verifyCallback: VerifyFunction = async (username, password, done) => {
  try {
    const user = (await User.findOne({ username })) as Express.User;
    if (!user) return done(null, false, { message: 'O usuário não existe' });
    if (validatePasswordSync(password, user.password)) return done(null, user);
    return done(null, false, { message: 'Senha incorreta' });
  } catch (err) {
    done(err);
  }
};

export const localStrategy = new Strategy({}, verifyCallback);

export function serialize(user: Express.User, done: Function) {
  done(null, user.id);
}

export async function deserialize(id: string, done: Function) {
  let user, error;
  try {
    user = await User.findById(id);
  } catch (err) {
    error = err;
  } finally {
    done(error, user);
  }
}
