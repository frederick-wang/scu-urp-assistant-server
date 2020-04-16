import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfoModule } from './info/info.module'
import { StudentModule } from './student/student.module';

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
    StudentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
