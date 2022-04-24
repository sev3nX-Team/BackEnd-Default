import { injectable } from 'inversify';

import { User } from '@modules/User/infrastructure/typeorm/entities/User';

@injectable()
export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<User>;
}
