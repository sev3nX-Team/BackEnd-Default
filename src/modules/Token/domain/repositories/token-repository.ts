import { Token } from '@modules/Token/infrastructure/typeorm/entities/Token';
import { injectable } from 'inversify';

@injectable()
export abstract class TokenRepository {
  abstract findNotExpired(
    encrypted: string,
    user_id: string,
  ): Promise<Token | null>;
  abstract save(parameters: Partial<Token>): Promise<void>;
}
