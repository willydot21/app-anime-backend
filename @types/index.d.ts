
import { Request } from 'express';

export interface RequestProps extends Request {
  user?: any
}