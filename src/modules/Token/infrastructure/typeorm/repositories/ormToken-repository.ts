import { Repository } from 'typeorm';

import { dataSource } from '@shared/infrastructure/typeorm';
import { Token } from '@modules/Token/infrastructure/typeorm/entities/Token';
import { TokenRepository } from '@modules/Token/domain/repositories/token-repository';

export class OrmTokenRepository implements TokenRepository {
  private readonly ormRepository: Repository<Token>;

  public constructor() {
    this.ormRepository = dataSource.getRepository(Token);
  }

  async findNotExpired(
    encrypted: string,
    user_id: string,
  ): Promise<Token | null> {
    // Verifica se o token passado na request existe no banco de dados e nao esta expirado
    const token = await this.ormRepository.findOneBy({
      encrypted,
      user_id,
      expired: false,
    });
    return token;
  }

  async save(parameters: Partial<Token>): Promise<void> {
    await this.ormRepository.save({ ...parameters });
  }
}
