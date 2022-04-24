import _ from 'lodash';
import jwt from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';

export class AuthenticationToken {
  private readonly token: string;

  private readonly decodedToken: unknown;

  public constructor(token: string) {
    const sanitizedToken = token.replace(/^bearer/i, '').trim();
    const decodedToken = jwt.decode(sanitizedToken);

    if (decodedToken === null || typeof decodedToken === 'string') {
      throw new AppError('Invalid token');
    }

    this.token = sanitizedToken;
    this.decodedToken = decodedToken;
  }

  public static isValid(token: string): boolean {
    try {
      new AuthenticationToken(token);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  public getAllClaims(): unknown {
    return this.decodedToken;
  }

  public toString(): string {
    return this.token;
  }
}
