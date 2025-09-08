import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_token_expires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_refresh_token_expires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
};
