import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infrastructure/typeorm';
import { User } from '@modules/User/infrastructure/typeorm/entities/User';
import { UserRepository } from '@modules/User/domain/repositories/user-repository';

@injectable()
export class OrmUserRepository implements UserRepository {
  private readonly ormRepository: Repository<User>;

  public constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  async findByUsername(username: string): Promise<User | null> {
    const userDb = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return userDb;
  }
}
