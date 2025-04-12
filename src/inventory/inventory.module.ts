import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Product } from './entities/product.entity';
import { Promotion } from './entities/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaProducerService } from './kafka/kafka-producer.service';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Promotion])],
  controllers: [InventoryController],
  providers: [InventoryService, KafkaProducerService],
})
export class InventoryModule {}
