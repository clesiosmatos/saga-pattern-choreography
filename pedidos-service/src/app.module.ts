import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

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
            groupId: 'pedidos-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})

export class AppModule {}