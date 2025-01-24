import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);

  constructor(
    @Inject('PEDIDOS_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  async criarPedido(dadosPedido: any) {
    const { name, quantity, usuarioId } = dadosPedido;

    this.logger.log(`Criando pedido ${JSON.stringify(dadosPedido)}`);
    this.kafkaClient.emit('pedido-criado', {
      pedidoId: Date.now(),
      name,
      quantity,
      usuarioId,
    });
  }
}
