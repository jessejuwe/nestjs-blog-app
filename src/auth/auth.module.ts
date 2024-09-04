import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { GoogleAuthController } from './social/google-auth.controller';
import { GoogleAuthService } from './social/providers/google-auth.service';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';

import { UsersModule } from 'src/users/users.module';

/**
 * Module for authentication
 */
@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController, GoogleAuthController],
  providers: [
    AuthService,
    SignInProvider,
    { provide: HashingProvider, useClass: BcryptProvider },
    GenerateTokensProvider,
    RefreshTokensProvider,
    GoogleAuthService,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
