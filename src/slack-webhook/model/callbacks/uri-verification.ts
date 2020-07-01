import { IsNotEmpty, IsString } from 'class-validator';
import { WebhookHandler } from '../handler';
import { WebhookCallback } from './callback';

export class UriVerification extends WebhookCallback {
  @IsString()
  @IsNotEmpty()
  public token!: string;

  @IsString()
  @IsNotEmpty()
  public challenge!: string;

  public dispatch(handler: WebhookHandler): Promise<any> {
    return handler.handleUriVerification(this);
  }
}
