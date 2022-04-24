import { Request, Response } from 'express';

import { VerifyJwtService } from '@modules/Auth/infrastructure/services/verifyjwt-service';
import { GenerateJwtService } from '@modules/Auth/infrastructure/services/generateJwt-service';
import {
  VerifyJwtResponse,
  GenerateJwtResponse,
} from '@modules/Auth/infrastructure/http/controllers/responses';

export class AuthController {
  async generateToken(request: Request, response: Response): Promise<Response> {
    const service = new GenerateJwtService(request.body.payload);
    const result = await service.execute(request.user.id);
    return response.status(200).send(new GenerateJwtResponse(result).toPlain());
  }

  async verifyToken(request: Request, response: Response): Promise<Response> {
    const service = new VerifyJwtService(request.body.encrypted);
    const result = await service.execute();
    if (!result) {
      return response.status(403).end();
    }
    return response.status(200).send(new VerifyJwtResponse(result).toPlain());
  }
}
