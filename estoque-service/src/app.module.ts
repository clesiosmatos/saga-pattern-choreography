import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PEDIDOS_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'estoque-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [EstoqueController],
  providers: [EstoqueService],
})
export class AppModule {}
