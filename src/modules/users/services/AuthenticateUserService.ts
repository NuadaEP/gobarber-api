import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import User from '../entities/User';
import AppError from '../../../shared/errors/AppError';

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

    if (!user) throw new AppError('Incorret email/password combination', 401);

    const passwordMatch = await compare(password, user.password);

    const { secret, expiresIn } = authConfig.jwt;

    if (!passwordMatch)
      throw new AppError('Incorret email/password combination', 401);

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
