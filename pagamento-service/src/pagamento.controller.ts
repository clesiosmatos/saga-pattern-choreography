import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PagamentoService } from './pagamento.service';

@Controller()
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @MessagePattern('estoque-reservado')
  async processarPagamento(@Payload() message: any) {
    return this.pagamentoService.processarPagamento(message.pedidoId);
  }
}
