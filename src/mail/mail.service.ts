import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string, code: number) {
    await this.mailerService.sendMail({
      to: email,
      from: 'General Market',
      subject: 'Код подтверждения General Market',
      template: './email',
      context: {
        name,
        code,
      },
    })
  }
}
