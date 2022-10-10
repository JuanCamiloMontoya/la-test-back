import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from '@nestjs/mongoose'
import appConfig from './@common/config/app.config'
import authConfig from './@common/config/auth.config'
import mongodbConfig from './@common/config/mongodb.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, mongodbConfig, authConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('mongodb'),
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
