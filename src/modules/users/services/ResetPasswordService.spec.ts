// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokenRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    };

    const user = await fakeUsersRepository.create(data);

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({ password: '123123', token });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
