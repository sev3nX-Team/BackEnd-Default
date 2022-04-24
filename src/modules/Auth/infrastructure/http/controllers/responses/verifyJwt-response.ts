import { instanceToPlain, Expose } from 'class-transformer';

export class VerifyJwtResponse {
  @Expose()
  public token: string;

  public constructor(token: string) {
    this.token = token.toString();
  }

  public toPlain(): unknown {
    return instanceToPlain(this);
  }
}
