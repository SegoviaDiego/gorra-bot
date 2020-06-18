import { WebhookHandler } from '../../handler';

export abstract class WebhookEvent {
  public dispatch(handler: WebhookHandler): Promise<any>;

  public dispatch(): Promise<any> {
    return Promise.resolve();
  }
}
