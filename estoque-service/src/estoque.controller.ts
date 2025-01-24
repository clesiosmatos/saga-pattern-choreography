import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EstoqueService } from './estoque.service';

@Controller()
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @MessagePattern('pedido-criado')
  async reservarEstoque(dados: any) {
    return this.estoqueService.reservarEstoque(dados.pedidoId);
  }
}

