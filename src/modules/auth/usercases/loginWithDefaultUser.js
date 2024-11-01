import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InvalidCredentialsError } from '../errors/auth.errors.js';

export class LoginWithDefaultUser {
  async handle({ username, password }) {
    const defaultUser = process.env.USERNAME_DEFAULT;
    const defaultPassword = process.env.PASSWORD_DEFAULT;

    if (username != defaultUser) {
      throw new InvalidCredentialsError();
    }
    
    const defaultPassEncripted = bcrypt.hashSync(defaultPassword);
    const isPasswordValid = await bcrypt.compare(password, defaultPassEncripted);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign({ role: 'defalt_user', username: defaultUser }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
  }
}
