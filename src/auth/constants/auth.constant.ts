import { config } from 'dotenv'

config()

export const jwtConstants = {
  secret_access: process.env.JWT_ACCESS_SECRET!,
  secret_refresh: process.env.JWT_REFRESH_SECRET!,
  access_expiration: Number(process.env.JWT_ACCESS_EXPIRATION!),
  secret_expiration: Number(process.env.JWT_REFRESH_EXPIRATION!)
};
