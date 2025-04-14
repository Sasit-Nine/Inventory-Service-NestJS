import { MiddlewareConsumer, Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Product } from './entities/product.entity';
import { Promotion } from './entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaProducerService } from './kafka/kafka-producer.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CheckHeaderMiddleware } from './middleware/header.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Promotion])],
  controllers: [InventoryController],
  providers: [InventoryService, KafkaProducerService],
})
export class InventoryModule {
  configure(consumer: MiddlewareConsumer) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
