import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { Message, WebhookHandler } from './model';
import { UriVerification } from './model/callbacks';
import { SlackWebhookConfig } from './slack-webhook.config';

@Injectable()
export class SlackWebhookService implements WebhookHandler {
  constructor(private readonly config: SlackWebhookConfig) {}

  public handleUriVerification(
    uriVerification: UriVerification
  ): Promise<string> {
    return Promise.resolve(uriVerification.challenge);
  }

  public async handleMessage(message: Message): Promise<void> {
    const client = this.getClient();
    if (message.text.includes('Hola GorraBot')) {
      await client.chat.postMessage({
        channel: message.channel,
        text: 'Hola!'
      });
    }
  }

  private getClient(): WebClient {
    return new WebClient(this.config.token);
  }
}
