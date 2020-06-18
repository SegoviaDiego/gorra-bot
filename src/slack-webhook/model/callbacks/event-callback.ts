import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';
import { WebhookHandler } from '../handler';
import { WebhookCallback } from './callback';
import { Message, WebhookEvent } from './events';

export class EventCallback extends WebhookCallback {
  @IsString()
  @IsNotEmpty()
  public token!: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'team_id' })
  public teamId!: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'api_app_id' })
  public apiAppId!: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'event_id' })
  public eventId!: string;

  @IsNumber()
  @Expose({ name: 'event_time' })
  public eventTime!: number;

  @ValidateNested()
  @Type(() => WebhookEvent, {
    discriminator: {
      property: 'type',
      subTypes: [{ name: 'message', value: Message }]
    }
  })
  public event!: WebhookEvent;

  public dispatch(handler: WebhookHandler): Promise<any> {
    return this.event.dispatch(handler);
  }
}
