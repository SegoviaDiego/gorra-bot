import { DynamicModule, Module, Type } from '@nestjs/common';
import { SlackWebhookConfig } from './slack-webhook.config';
import { SlackWebhookController } from './slack-webhook.controller';
import { SlackWebhookService } from './slack-webhook.service';

export type SlackWebhookModuleOptions = {
  inject?: any[];
} & (
  | { useExisting: Type<SlackWebhookConfig> }
  | { useClass: Type<SlackWebhookConfig> }
  | {
      useFactory: (
        ...args: any[]
      ) => Promise<SlackWebhookConfig> | SlackWebhookConfig;
    }
);

@Module({
  controllers: [SlackWebhookController],
  providers: [SlackWebhookService]
})
export class SlackWebhookModule {
  public static forRoot(options: SlackWebhookModuleOptions): DynamicModule {
    return {
      module: SlackWebhookModule,
      providers: [
        {
          provide: SlackWebhookConfig,
          ...options
        }
      ]
    };
  }
}
