import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { async as cryptoRandomString } from 'crypto-random-string';
import {
  decode,
  DecodeOptions,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from 'jsonwebtoken';
import { INVALID_TOKEN } from 'src/errors/errors.constants';
import { v4 } from 'uuid';

@Injectable()
export class TokensService {
  constructor(private configService: ConfigService) {}
  /**
   * Sign a JWT
   * @param subject - Subject
   * @param payload - Object payload
   * @param expiresIn - Expiry string (vercel/ms)
   * @param options - Signing options
   */
  signJwt(
    subject: string,
    payload: number | string | object | Buffer,
    expiresIn?: string,
    options?: SignOptions,
  ) {
    if (typeof payload === 'number') payload = payload.toString();
    options = { ...options, subject };
    if (expiresIn) options.expiresIn = expiresIn;

    return sign(
      payload,
      this.configService.get<string>('security.jwtSecret') ?? '',
      options,
    );
  }

  /**
   * Verify and decode a JWT
   * @param subject - Subject
   * @param token - JWT
   * @param options - Verify options
   */
  verify<T>(subject: string, token: string, options?: VerifyOptions) {
    try {
      return verify(
        token,
        this.configService.get<string>('security.jwtSecret') ?? '',
        { ...options, subject },
      ) as any as T;
    } catch (error) {
      throw new UnauthorizedException(INVALID_TOKEN);
    }
  }

  /**
   * Decode a JWT without verifying it
   * @deprecated Use verify() instead
   * @param token - JWT
   * @param options - Decode options
   */
  decode<T>(token: string, options?: DecodeOptions) {
    return decode(token, options) as T;
  }

  /**
   * Generate a UUID
   */
  generateUuid() {
    return v4();
  }

  /**
   * Generate a cryptographically strong random string
   * @param length - Length of returned string
   * @param charactersOrType - Characters or one of the supported types
   */
  async generateRandomString(
    length = 32,
    charactersOrType = 'alphanumeric',
  ): Promise<string> {
    if (
      [
        'hex',
        'base64',
        'url-safe',
        'numeric',
        'distinguishable',
        'ascii-printable',
        'alphanumeric',
      ].includes(charactersOrType)
    )
      return await cryptoRandomString({
        length,
        type: charactersOrType as
          | 'hex'
          | 'base64'
          | 'url-safe'
          | 'numeric'
          | 'distinguishable'
          | 'ascii-printable'
          | 'alphanumeric',
      });
    return await cryptoRandomString({ length, characters: charactersOrType });
  }
}
