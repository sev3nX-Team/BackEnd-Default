import { CipherKey, BinaryLike } from 'crypto';

export interface CryptoConfig {
  algorithm: string;
  secretKey: string;
}

export interface cryptoParameters {
  algorithm: string;
  key: CipherKey;
  iv: BinaryLike;
}
