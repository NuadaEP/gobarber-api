import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
// import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

// container.registerSingleton<IUserTokenRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// );
