import { IsNotEmpty, IsString } from 'class-validator';
import { WebhookHandler } from '../../handler';
import { WebhookEvent } from './event';

export class Message extends WebhookEvent {
  @IsString()
  @IsNotEmpty()
  public channel!: string;

  @IsString()
  @IsNotEmpty()
  public user!: string;

  @IsString()
  @IsNotEmpty()
  public text!: string;

  @IsString()
  @IsNotEmpty()
  public ts!: string;

  public dispatch(handler: WebhookHandler): Promise<any> {
    return handler.handleMessage(this);
  }
}
