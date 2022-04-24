import { diContainer } from '@shared/helpers/inversify';
import { UserRepository } from '@modules/User/domain/repositories/user-repository';
import { OrmUserRepository } from '@modules/User/infrastructure/typeorm/repositories/ormUser-repository';
import { GetUsersController } from '@modules/User/infrastructure/http/controllers/get-users-controller';

diContainer.bind(UserRepository).to(OrmUserRepository);
diContainer.bind(GetUsersController).toSelf();
