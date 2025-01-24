import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PagamentoService {
  private readonly logger = new Logger(PagamentoService.name);

  constructor(
    @Inject('PEDIDOS_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  async processarPagamento(pedidoId: string) {
    try {
      this.logger.log(`Processando pagamento do pedido ${pedidoId}`);
      const pagamentoOk = await this.realizarPagamento(pedidoId);

      if (!pagamentoOk) {
        this.logger.error(`Pagamento não confirmado para o pedido ${pedidoId}`);
        this.clientKafka.emit('pagamento-nao-confirmado', { pedidoId });
        return;
      }

      this.logger.log(`Pagamento confirmado para o pedido ${pedidoId}`);
      this.clientKafka.emit('pagamento-confirmado', { pedidoId });
    } catch (error) {
      this.logger.error(
        `Erro ao processar pagamento para o pedido ${pedidoId}`,
        error,
      );
      this.clientKafka.emit('pagamento-nao-confirmado', { pedidoId });
    }
  }

  async realizarPagamento(dados: any): Promise<boolean> {
    return true;
  }
}
