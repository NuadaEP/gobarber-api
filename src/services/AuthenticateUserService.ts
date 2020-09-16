import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) throw new Error('Incorret email/password combination');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('Incorret email/password combination');

    const token = sign({}, 'e0f5995c95857cc2f00336c542b4f96e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
