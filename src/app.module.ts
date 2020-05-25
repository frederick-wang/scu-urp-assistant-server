import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfoModule } from './info/info.module'
import { StudentModule } from './student/student.module'
import { UserModule } from './user/user.module'

import { ErrorsInterceptor } from './core/interceptors/errors.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: [`.env.${process.env.NODE_ENV}`, '.env']
        })
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get<string>('DB_SYNCHRONIZE').toLowerCase() == 'true',
        charset: 'utf8mb4'
      }),
      inject: [ConfigService]
    }),
    InfoModule,
    StudentModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR, // 全局拦截器，这里使用全局异常拦截器改写异常消息结构
      useClass: ErrorsInterceptor
    },
    AppService
  ]
})
export class AppModule {}
