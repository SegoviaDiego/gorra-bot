import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        if (process.env.NODE_ENV === 'production') {
          return {
            uri: process.env.MONGO_URI,
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
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
