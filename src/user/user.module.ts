import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from 'src/core/auth/auth.module'
import { PassportModule } from '@nestjs/passport'
import { User } from './entities/User.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule) // 处理模块间的循环依赖
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
