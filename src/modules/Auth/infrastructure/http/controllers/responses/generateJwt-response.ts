import { instanceToPlain, Expose } from 'class-transformer';

export class GenerateJwtResponse {
  @Expose()
  public encrypted: string;

  public constructor(encoded: string) {
    this.encrypted = encoded.toString();
  }

  public toPlain(): unknown {
    return instanceToPlain(this);
  }
}
