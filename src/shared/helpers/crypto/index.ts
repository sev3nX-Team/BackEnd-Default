import { createDecipheriv, createCipheriv } from 'crypto';
import { CryptoConfig, cryptoParameters } from '@shared/helpers/crypto/types';

export class CryptoHelper {
  static cryptoParameters: cryptoParameters;
  constructor({ algorithm, secretKey }: CryptoConfig) {
    CryptoHelper.cryptoParameters = {
      algorithm: algorithm,
      key: secretKey,
      iv: '',
    };
  }

  static async setup({
    algorithm,
    secretKey,
  }: CryptoConfig): Promise<CryptoHelper> {
    return new CryptoHelper({ algorithm, secretKey });
  }

  public static encrypt(data: string): string {
    const cipher = createCipheriv(
      CryptoHelper.cryptoParameters.algorithm,
      CryptoHelper.cryptoParameters.key,
      CryptoHelper.cryptoParameters.iv,
    );

    return (
      cipher
        // pode ser base64 ou hex
        .update(data, 'utf8', 'base64')
        .concat(cipher.final('base64'))
    );
  }

  public static decrypt(data: string): string {
    const cipher = createDecipheriv(
      CryptoHelper.cryptoParameters.algorithm,
      CryptoHelper.cryptoParameters.key,
      CryptoHelper.cryptoParameters.iv,
    );

    return cipher
      .update(data.toString(), 'base64', 'utf-8')
      .concat(cipher.final('utf-8'));
  }
}
