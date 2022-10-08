import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import seedDefaultData from './helpers/seedDefaultData'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  await seedDefaultData()
  await app.listen(3000)
}
bootstrap()
