import { WebhookHandler } from '../handler';

export abstract class WebhookCallback {
  public dispatch(handler: WebhookHandler): Promise<any>;

  public dispatch(): Promise<any> {
    return Promise.resolve();
  }
}
