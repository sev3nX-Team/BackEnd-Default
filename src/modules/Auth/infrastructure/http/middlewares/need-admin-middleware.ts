import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import AppError from '@shared/errors/AppError';
import { RoleRepository } from '@modules/Role/domain/repositories/role-repository';
import { RolesEnum } from '@modules/Role/domain/entities/role-enum';

@injectable()
export class NeedAdmin implements ExpressMiddlewareInterface {
  public constructor(
    @inject(RoleRepository) private readonly roleRepository: RoleRepository,
  ) {}

  public async use(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const adminRole = await this.roleRepository.findByName(RolesEnum.admin);

    if (request.user.role === adminRole.id) {
      next();
    } else {
      throw new AppError('Need Admin Role!', StatusCodes.UNAUTHORIZED);
    }
  }
}
