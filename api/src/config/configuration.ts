import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import dotenv, { config } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';
import { Configuration } from './configuration.interface';

// dotenvExpand.expand(dotenv.config());
dotenvExpand(config());

const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';
const defaults = { id: 'api', name: 'API' };

const configuration: Configuration = {
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  rateLimit: {
    public: {
      points: int(process.env.RATE_LIMIT_PUBLIC_POINTS, 250),
      duration: int(process.env.RATE_LIMIT_PUBLIC_DURATION, 3600),
    },
    authenticated: {
      points: int(process.env.RATE_LIMIT_AUTHENTICATED_POINTS, 5000),
      duration: int(process.env.RATE_LIMIT_AUTHENTICATED_DURATION, 3600),
    },
    apiKey: {
      points: int(process.env.RATE_LIMIT_API_KEY_POINTS, 10000),
      duration: int(process.env.RATE_LIMIT_API_KEY_DURATION, 3600),
    },
  },
  email: {
    name: process.env.EMAIL_NAME ?? 'Staart',
    from: process.env.EMAIL_FROM ?? '',
    cc: process.env.ADMIN_EMAIL ?? '',
    retries: int(process.env.EMAIL_FAIL_RETRIES, 3),
    ses: {
      accessKeyId: process.env.EMAIL_SES_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.EMAIL_SES_SECRET_ACCESS_KEY ?? '',
      region: process.env.EMAIL_SES_REGION ?? '',
    },
    transport: {
      host: process.env.EMAIL_HOST ?? '',
      port: int(process.env.EMAIL_PORT, 587),
      secure: bool(process.env.EMAIL_SECURE, false),
      auth: {
        user: process.env.EMAIL_USER ?? process.env.EMAIL_FROM ?? '',
        pass: process.env.EMAIL_PASSWORD ?? '',
      },
    },
  },

  fileUpload: {
    serverUrl: process.env['FILE_UPLOAD_SERVER_URL'] ?? '',
    retries: int(process.env['FILE_UPLOAD_FAIL_RETRIES'], 3),
    auth: {
      username: process.env['FILE_UPLOAD_USERNAME'] ?? '',
      password: process.env['FILE_UPLOAD_PASSWORD'] ?? '',
    },
  },
  security: {
    saltRounds: int(process.env['SALT_ROUNDS'], 10),
    jwtSecret: process.env['JWT_SECRET'] ?? defaults.id,
    totpWindowPast: int(process.env['TOTP_WINDOW_PAST'], 1),
    totpWindowFuture: int(process.env['TOTP_WINDOW_FUTURE'], 0),
    mfaTokenExpiry: process.env['MFA_TOKEN_EXPIRY'] ?? '10m',
    mergeUsersTokenExpiry: process.env['MERGE_USERS_TOKEN_EXPIRY'] ?? '30m',
    accessTokenExpiry: process.env['ACCESS_TOKEN_EXPIRY'] ?? '1h',
    passwordPwnedCheck: bool(process.env['PASSWORD_PWNED_CHECK'], true),
    unusedRefreshTokenExpiryDays: int(
      process.env['DELETE_EXPIRED_SESSIONS'],
      30,
    ),
    inactiveUserDeleteDays: int(process.env['INACTIVE_USER_DELETE_DAYS'], 30),
  },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
