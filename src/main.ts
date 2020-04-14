import { NestFactory } from '@nestjs/core'
import * as helmet from 'helmet'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 从 .env 文件中读取侦听端口配置
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  // Nginx 反向代理会有前缀
  app.setGlobalPrefix('/sua/v2')
  // 保护一些著名的 Web 攻击
  app.use(helmet())
  // 让教务系统网站可以向程序发送 Ajax 请求
  app.enableCors({
    origin: ['http://zhjw.scu.edu.cn', 'http://202.115.47.141']
  })
  console.log(`四川大学综合教务系统助手服务端已成功启动，端口：${port}`)
  await app.listen(port)
}
bootstrap()
