import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SlackWebhookConfig } from './slack-webhook/slack-webhook.config';
import { SlackWebhookModule } from './slack-webhook/slack-webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production'
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        if (process.env.NODE_ENV === 'production') {
          return {
            uri: config.get('MONGO_URI'),
            useNewUrlParser: true
          };
        } else {
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          const { default: mongoose } = await import('mongoose');

          mongoose.set('debug', true);
          const mongod = new MongoMemoryServer();
          const uri = await mongod.getUri();

          return { uri };
        }
      },
      inject: [ConfigService]
    }),
    SlackWebhookModule.forRoot({
      useFactory: (config: ConfigService) =>
        new SlackWebhookConfig(config.get<string>('SLACK_TOKEN')!),
      inject: [ConfigService]
    })
  ]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): any {
    MorganMiddleware.configure('combined');
    consumer.apply(MorganMiddleware).forRoutes('/');
  }
}
