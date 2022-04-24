import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { dataSource } from '@shared/infrastructure/typeorm';
import { Role } from '@modules/Role/infrastructure/typeorm/entities/Role';
import { RoleRepository } from '@modules/Role/domain/repositories/role-repository';

@injectable()
export class OrmRoleRepository implements RoleRepository {
  private readonly ormRepository: Repository<Role>;

  public constructor() {
    this.ormRepository = dataSource.getRepository(Role);
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return role;
  }
}
