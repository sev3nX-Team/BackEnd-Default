import { diContainer } from '@shared/helpers/inversify';
import { OrmTokenRepository } from './infrastructure/typeorm/repositories/ormToken-repository';
import { TokenRepository } from './domain/repositories/token-repository';

diContainer.bind(TokenRepository).to(OrmTokenRepository);
