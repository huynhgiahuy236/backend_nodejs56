import { BadRequestException, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } from '../../common/constant/app.constant.js';

type TokenPayload = jwt.JwtPayload & {
  userId: number;
};

@Injectable() 
export class TokenService {
  createAccessToken(userID: number) {
    if (!userID) {
      throw new BadRequestException('Không có userID để tạo access token');
    }

    const accessToken = jwt.sign({ userId: userID }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '1h',
    });

    return accessToken;
  }

  createRefreshToken(userID: number) {
    if (!userID) {
      throw new BadRequestException('Không có userID để tạo refresh token');
    }

    const refreshToken = jwt.sign(
      { userId: userID },
      REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: '7d',
      },
    );

    return refreshToken;
  }

  verifyAccessToken(
    accessToken: string,
    options: jwt.VerifyOptions = {},
  ): TokenPayload {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, options);

    if (
      typeof decoded === 'string' ||
      !('userId' in decoded) ||
      typeof decoded.userId !== 'number'
    ) {
      throw new BadRequestException('Access token khong hop le');
    }

    return decoded as TokenPayload;
  }

  verifyRefreshToken(
    refreshToken: string,
    options: jwt.VerifyOptions = {},
  ): TokenPayload {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, options);

    if (
      typeof decoded === 'string' ||
      !('userId' in decoded) ||
      typeof decoded.userId !== 'number'
    ) {
      throw new BadRequestException('Refresh token khong hop le');
    }

    return decoded as TokenPayload;
  }
}
