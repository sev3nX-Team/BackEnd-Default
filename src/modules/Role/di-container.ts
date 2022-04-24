import { diContainer } from '@shared/helpers/inversify';
import { RoleRepository } from './domain/repositories/role-repository';
import { OrmRoleRepository } from './infrastructure/typeorm/repositories/ormRole-repository';

diContainer.bind(RoleRepository).to(OrmRoleRepository);
