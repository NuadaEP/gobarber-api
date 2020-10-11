import { inject, injectable } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUserRepository,

    @inject('MailProvider') private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido!',
    );
  }
}
