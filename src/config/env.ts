declare const process: {
  env: {
    PORT: number;
    HOST: string;
    JWT_SECRET_KEY: string;
    JWT_ISSUER: string;
    CRYPTO_ALGORITHM: string;
    CRYPTO_KEY: string;
  };
};

export default {
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    issuer: process.env.JWT_ISSUER,
  },
  crypto: {
    algorithm: process.env.CRYPTO_ALGORITHM,
    secretKey: process.env.CRYPTO_KEY,
  },
};
