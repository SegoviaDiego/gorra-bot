import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { EventCallback, UriVerification, WebhookCallback } from './callbacks';
import { WebhookHandler } from './handler';

export class WebhookRequest {
  @IsDefined()
  @ValidateNested()
  @Type(() => WebhookCallback, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: 'url_verification', value: UriVerification },
        { name: 'event_callback', value: EventCallback }
      ]
    }
  })
  public callback!: WebhookCallback;

  public dispatch(handler: WebhookHandler): Promise<any> {
    return this.callback.dispatch(handler);
  }
}
