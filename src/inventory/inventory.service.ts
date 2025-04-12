import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { KafkaProducerService } from './kafka/kafka-producer.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private kafkaProducerService: KafkaProducerService,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Product> {
    const product = this.productRepository.create(createInventoryDto);
    const saveProduct = await this.productRepository.save(product);
    await this.kafkaProducerService.emit(
      'inventory.created',
      JSON.stringify({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        description: product.description,
        price: product.price,
      }),
    );
    return saveProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    Object.assign(product, updateInventoryDto);
    const updatedProduct = await this.productRepository.save(product);
    await this.kafkaProducerService.emit(
      'inventory.updated',
      JSON.stringify({
        id: updatedProduct.id,
        name: updatedProduct.name,
        quantity: updatedProduct.quantity,
        description: product.description,
        price: updatedProduct.price,
      }),
    );
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    await this.kafkaProducerService.emit(
      'inventory.deleted',
      JSON.stringify({
        id: product.id,
      }),
    );
    await this.productRepository.remove(product);
  }
}
