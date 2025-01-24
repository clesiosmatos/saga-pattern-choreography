import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EstoqueService {
  private readonly logger = new Logger(EstoqueService.name);

  constructor(
    @Inject('PEDIDOS_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  async reservarEstoque(pedidoId: string) {
    try {
      this.logger.log(
        `Verificando e reservando estoque para pedido ${pedidoId}`,
      );
      const successo = await this.verificarEReservarEstoque();

      if (!successo) {
        this.logger.log(`Estoque indisponível para pedido ${pedidoId}`);
        this.clientKafka.emit('estoque-indisponivel', { pedidoId });
        return;
      }

      this.logger.log(`Estoque reservado para pedido ${pedidoId}`);
      this.clientKafka.emit('estoque-reservado', { pedidoId });
    } catch (error) {
      this.logger.error(
        `Erro ao reservar estoque para pedido ${pedidoId}`,
        error,
      );
      this.clientKafka.emit('estoque-indisponivel', { pedidoId });
    }
  }

  async verificarEReservarEstoque(): Promise<boolean> {
    return true;
  }
}
