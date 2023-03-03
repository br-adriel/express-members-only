import { IUser } from './src/models/User';

namespace NodeJS {
  interface ProcessEnv {
    DB_URL?: string;
    PORT?: number;
    SESSION_SECRET?: string;
  }
}

declare global {
  namespace Express {
    export interface User extends IUser {
      id: string;
    }
  }
}
