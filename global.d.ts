import { IUser } from './src/models/User';

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DB_URL?: string;
      PORT?: number;
      SESSION_SECRET?: string;
      VIP_CODE?: string;
      USE_BACKSLASH_FOR_FILES_PATH?: boolean;
    }
  }

  namespace Express {
    export interface User extends IUser {
      id: string;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    messages?: string[];
  }
}
