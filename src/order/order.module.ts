import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/db/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/db/entities/order.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
