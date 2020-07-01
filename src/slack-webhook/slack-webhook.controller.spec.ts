import { Test, TestingModule } from '@nestjs/testing';
import { SlackWebhookConfig } from './slack-webhook.config';
import { SlackWebhookController } from './slack-webhook.controller';
import { SlackWebhookService } from './slack-webhook.service';

describe('SlackWebhook Controller', () => {
  let controller: SlackWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackWebhookService,
        {
          provide: SlackWebhookConfig,
          useValue: new SlackWebhookConfig('TEST_TOKEN')
        }
      ],
      controllers: [SlackWebhookController]
    }).compile();

    controller = module.get<SlackWebhookController>(SlackWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
