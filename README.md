# Padrão Saga com Coreografia

![License](https://img.shields.io/github/license/clesiosmatos/saga-pattern-choreography)
![Language](https://img.shields.io/github/languages/top/clesiosmatos/saga-pattern-choreography)
![Stars](https://img.shields.io/github/stars/clesiosmatos/saga-pattern-choreography?style=social)

## Sumário

- [Introdução](#introdução)
- [O que é o Padrão Saga?](#o-que-é-o-padrão-saga)
- [Coreografia vs. Orquestração](#coreografia-vs-orquestração)
- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Arquitetura](#arquitetura)

## Introdução

Bem-vindo ao projeto **Padrão Saga com Coreografia**! Este repositório demonstra a implementação do padrão Saga utilizando coreografia para gerenciar transações distribuídas em uma arquitetura de microsserviços. Ao aproveitar a coreografia, cada microsserviço se comunica com os outros através de eventos, garantindo um sistema descentralizado e resiliente.

## O que é o Padrão Saga?

O **Padrão Saga** é um padrão de design usado para gerenciar transações complexas que abrangem múltiplos microsserviços. Em vez de usar transações distribuídas, que podem ser complicadas e difíceis de gerenciar, o padrão Saga divide uma transação em uma série de etapas menores e gerenciáveis (transações locais). Cada etapa é executada por um microsserviço separado e, se qualquer etapa falhar, ações compensatórias são acionadas para manter a consistência dos dados.

### Principais Benefícios

- **Escalabilidade**: Cada serviço pode escalar de forma independente.
- **Resiliência**: Falhas em um serviço não se propagam para os demais.
- **Flexibilidade**: Serviços podem evoluir de forma independente sem acoplamento rígido.

## Coreografia vs. Orquestração

Existem duas abordagens principais para implementar o padrão Saga:

1. **Orquestração**: Um coordenador central gerencia a transação, instruindo cada serviço sobre o que fazer.
2. **Coreografia**: Os serviços se comunicam entre si através de eventos sem um coordenador central.

Este projeto foca na abordagem de **Coreografia**, promovendo uma arquitetura mais descentralizada e flexível.

## Visão Geral do Projeto

Este repositório fornece um exemplo prático de implementação do padrão Saga utilizando coreografia. Ele inclui:

- **Microsserviços**: Vários serviços que participam de uma saga.
- **Event Bus**: Facilita a comunicação entre os serviços via eventos.
- **Transações Compensatórias**: Gerencia falhas revertendo ações anteriores.
- **Docker Compose**: Simplifica a configuração e orquestração dos serviços.

## Arquitetura

1. **Pedidos Service**: Inicia a saga realizando uma transação local e publicando um evento pedido-criado, como demonstração ouve também o topico estoque-indisponivel. Caso ocorra, altera o status do pedido para "CANCELADO".
2. **Estoque Service**: Escuta eventos do Pagamento Service, realiza sua transação e publica seu próprio evento estoque-disponivel ou estoque-indisponivel.
3. **Pagamento Service**: Completa a saga realizando a transação final, publicando o evento pagamento-confirmado ou pagamento-nao-confirmado.
4. **Apache Kafka**: Garante a comunicação confiável entre os serviços.
5. **Mecanismo de Compensação**: Se qualquer serviço falhar, ações compensatórias são acionadas para manter a consistência.
