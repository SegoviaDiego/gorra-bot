import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { WebhookRequest } from './model';

@Injectable()
export class ParseWebhookRequestPipe implements PipeTransform {
  public async transform(callback: any): Promise<WebhookRequest> {
    const request = { callback };
    const instance = plainToClass(WebhookRequest, request);

    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new BadRequestException();
    } else {
      return instance;
    }
  }
}
