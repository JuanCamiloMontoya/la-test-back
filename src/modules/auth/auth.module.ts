import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { User, UserSchema } from '../user/schemas/user.schema'
import { JwtStrategy } from 'src/@common/strategies/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get('auth.jwtExpire') }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule { }
