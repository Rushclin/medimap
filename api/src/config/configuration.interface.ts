export interface Configuration {
  frontendUrl: string;

  rateLimit: {
    public: { points: number; duration: number };
    authenticated: { points: number; duration: number };
    apiKey: { points: number; duration: number };
  };

  email: {
    name: string;
    from: string;
    cc: string;
    retries: number;
    ses?: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
    };
    transport?: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };

  fileUpload: {
    serverUrl: string;
    retries: number;
    auth: {
      username: string;
      password: string;
    };
  };

  security: {
    saltRounds: number;
    jwtSecret: string;
    totpWindowPast: number;
    totpWindowFuture: number;
    mfaTokenExpiry: string;
    mergeUsersTokenExpiry: string;
    accessTokenExpiry: string;
    passwordPwnedCheck: boolean;
    unusedRefreshTokenExpiryDays: number;
    inactiveUserDeleteDays: number;
  };
}
