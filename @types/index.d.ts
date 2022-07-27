
import { Request } from 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION: boolean;
      PORT?: string;
      DATABASE: string;
      TOKEN_KEY: string;
      REFRESH_KEY: string;
    }
  }
}

export interface RequestProps extends Request {
  user?: any
}