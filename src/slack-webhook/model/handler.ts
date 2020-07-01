import { Message, UriVerification } from './callbacks';

export interface WebhookHandler {
  handleUriVerification(uriVerification: UriVerification): Promise<any>;
  handleMessage(message: Message): Promise<any>;
}
