import { User } from '@prisma/client';

declare global {
     namespace Express {
          interface Request{
               user: User;
          }
     }

     namespace NodeJS{

          interface ProcessEnv{
               DATABASE_URL: string,
               APP_URL: string,
               PORT: number
               SECRET_KEY: string
               NODE_ENV: string,
               JWT_EXPIRATION: string
          }
     }
}