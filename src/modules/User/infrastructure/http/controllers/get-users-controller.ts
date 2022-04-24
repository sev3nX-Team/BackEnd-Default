import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Get, JsonController, Res } from 'routing-controllers';

import { UserRepository } from '@modules/User/domain/repositories/user-repository';
// import AppError from '@shared/errors/AppError';

@injectable()
@JsonController()
export class GetUsersController {
  public constructor(
    @inject(UserRepository) private readonly repository: UserRepository,
  ) {}

  @Get('/users')
  public async getAccount(@Res() response: Response): Promise<Response> {
    //testing di
    const findUsers = await this.repository.findByUsername('USER2');

    // //testing handle errors
    // if(findUsers){
    //   throw new AppError('teste', 500)
    // }

    return response.status(StatusCodes.OK).json(findUsers);
  }
}
