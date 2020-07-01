import { ParseWebhookRequestPipe } from './slack-webhook.pipe';

describe('ParseWebhookRequestPipe', () => {
  it('should be defined', () => {
    expect(new ParseWebhookRequestPipe()).toBeDefined();
  });
});
