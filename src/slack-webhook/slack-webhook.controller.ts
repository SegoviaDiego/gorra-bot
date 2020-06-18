import { Body, Controller, Post } from '@nestjs/common';
import { WebhookRequest } from './model';
import { ParseWebhookRequestPipe } from './slack-webhook.pipe';
import { SlackWebhookService } from './slack-webhook.service';

@Controller('slack')
export class SlackWebhookController {
  constructor(private readonly service: SlackWebhookService) {}

  @Post()
  public onEvent(
    @Body(ParseWebhookRequestPipe)
    request: WebhookRequest
  ): Promise<any> {
    return request.dispatch(this.service);
  }
}
