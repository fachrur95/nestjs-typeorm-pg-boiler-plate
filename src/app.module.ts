import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configValidationSchema } from 'src/config.schema';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    EventEmitterModule.forRoot(),
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
