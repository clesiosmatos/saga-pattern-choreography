import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PagamentoController } from './pagamento.controller';
import { PagamentoService } from './pagamento.service';

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
            groupId: 'pagamento-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class AppModule {}
