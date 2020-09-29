import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: stirng): Promise<User | undefined> {}

  public async findByEmail(email: stirng): Promise<User | undefined> {}

  public async create({ provider_id, date }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(User);

    return appointment;
  }

  public async save(user: User): Promise<User> {}
}

export default UsersRepository;
