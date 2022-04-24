import { injectable } from 'inversify';

import { Role } from '@modules/Role/infrastructure/typeorm/entities/Role';

@injectable()
export abstract class RoleRepository {
  abstract findByName(name: string): Promise<Role | null>;
}
