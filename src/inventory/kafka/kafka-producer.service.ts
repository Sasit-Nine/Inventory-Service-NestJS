import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private producer: Producer;
  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log('Kafka producer connected');
  }
  async emit(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }
  async onModuleDestroy() {
    await this.producer.disconnect();
    console.log('Kafka producer disconnected');
  }
}
