import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

import { GoogleTokenDto } from '../dtos/google-token.dto';

import jwtConfig from 'src/auth/config/jwt.config';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Service responsible for Google authentication
 */
@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Method to initialize the OAuth2Client
   * @description Initializes the OAuth2Client with the Google Client ID and Client Secret
   * @returns void
   */
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  /**
   * Method to verify the Google token
   * @param token
   * @returns string
   */
  public async authenticate(googleTokenDto: GoogleTokenDto) {
    const token = googleTokenDto.token;

    try {
      // Verify the Google Token Sent By User
      const loginToken = await this.oauthClient.verifyIdToken({
        idToken: token,
      });

      // Extract the payload from Google Token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginToken.getPayload();

      // Find the user in the database using the googleId
      const user = await this.usersService.findOneByGoogleId(googleId);

      // If user id found generate the tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      } else {
        // If not create a new user and generate the tokens
        const userData = { email, googleId, firstName, lastName };
        const newUser = await this.usersService.createGoogleUser(userData);
        return await this.generateTokensProvider.generateTokens(newUser);
      }
    } catch (error) {
      // throw Unauthorised exception if not Authorised
      throw new UnauthorizedException();
    }
  }
}
