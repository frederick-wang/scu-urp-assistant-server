import { Module, forwardRef, HttpModule } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from 'src/core/auth/auth.module'
import { PassportModule } from '@nestjs/passport'
import { ChatAdmin } from './entities/ChatAdmin.entity'
import { User } from './entities/User.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env']
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ChatAdmin, User]),
    forwardRef(() => AuthModule) // 处理模块间的循环依赖
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
