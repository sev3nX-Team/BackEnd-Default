declare namespace Express {
  interface Request {
    user: {
      //document maybe
      username: string;
      role: string;
    };
  }
}
