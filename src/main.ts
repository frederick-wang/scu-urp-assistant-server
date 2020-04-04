import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  console.log(port)
  // 保护一些著名的 Web 攻击
  app.use(helmet())
  // 让教务系统网站可以向程序发送 Ajax 请求
  app.enableCors({
    origin: ['http://zhjw.scu.edu.cn', 'http://202.115.47.141']
  })
  await app.listen(port)
}
bootstrap()
