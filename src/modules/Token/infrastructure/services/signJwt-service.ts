import config from '@config/env';
import { PayloadJwt } from '@modules/Token/domain/entities/payload-jwt';
import jwt from 'jsonwebtoken';

export class SignJwt {
  constructor(private readonly payload: PayloadJwt) {}

  public execute(): string {
    return jwt.sign({ ...this.payload }, config.jwt.secretKey, {
      expiresIn: 3600 /* 1 hour */,
      issuer: config.jwt.issuer,
    });
  }
}
