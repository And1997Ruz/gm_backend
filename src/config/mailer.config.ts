import { ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

export class MailerConfig {
  static getConfig(config: ConfigService) {
    return {
      transport: {
        service: config.get('EMAIL_SERVICE'),
        auth: {
          user: config.get('EMAIL_USER'),
          pass: config.get('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: config.get('EMAIL_DEFAULT_FROM'),
      },
      template: {
        dir: __dirname + '/../../views',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }
  }
}
