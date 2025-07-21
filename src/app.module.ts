import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
