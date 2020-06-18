import { Test, TestingModule } from '@nestjs/testing';
import { SlackWebhookConfig } from './slack-webhook.config';
import { SlackWebhookService } from './slack-webhook.service';

describe('SlackWebhookService', () => {
  let service: SlackWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackWebhookService,
        {
          provide: SlackWebhookConfig,
          useValue: new SlackWebhookConfig('TEST_TOKEN')
        }
      ]
    }).compile();

    service = module.get<SlackWebhookService>(SlackWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
