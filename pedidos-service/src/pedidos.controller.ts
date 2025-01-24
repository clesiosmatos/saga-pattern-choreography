import { Body, Controller, Logger, Post } from "@nestjs/common";
import { PedidosService } from "./pedidos.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('pedido')
export class PedidosController {
  private readonly logger = new Logger(PedidosController.name);
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async criarPedido(@Body() dadosPedido: any) {
    return await this.pedidosService.criarPedido(dadosPedido);
  }

  @MessagePattern('estoque-indisponivel')
  async handleEstoqueIndisponivel(@Payload() message) {
    const { pedidoId } = message;

    this.logger.log(`Estoque indisponível para o pedido ${pedidoId}.`);
    this.logger.log(`Alterando status do pedido ${pedidoId} para "CANCELADO".`);
  }
}