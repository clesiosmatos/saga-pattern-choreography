# Saga Pattern with Orchestration

![License](https://img.shields.io/github/license/clesiosmatos/saga-pattern-choreography)
![Language](https://img.shields.io/github/languages/top/clesiosmatos/saga-pattern-choreography)
![Stars](https://img.shields.io/github/stars/clesiosmatos/saga-pattern-choreography?style=social)

## Table of Contents

- [Introduction](#introduction)
- [What is the Saga Pattern?](#what-is-the-saga-pattern)
- [Choreography vs. Orchestration](#choreography-vs-orchestration)
- [Project Overview](#project-overview)
- [Architecture](#architecture)

## Introduction

Welcome to the **Saga Pattern with Orchestration** project! This repository demonstrates the implementation of the Saga pattern using orchestration to manage distributed transactions in a microservices architecture. By leveraging orchestration, each microservice communicates with a specific one that do all orchestration, ensuring a resilient system.

## What is the Saga Pattern?

The **Saga Pattern** is a design pattern used to manage complex transactions that span multiple microservices. Instead of using distributed transactions, which can be complicated and difficult to manage, the Saga pattern breaks a transaction into a series of smaller, manageable steps (local transactions). Each step is executed by a separate microservice, and if any step fails, compensating actions are triggered to maintain data consistency.

### Key Benefits

- **Scalability**: Each service can scale independently.
- **Resilience**: Failures in one service do not propagate to others.
- **Flexibility**: Services can evolve independently without tight coupling.

## Choreography vs. Orchestration

There are two main approaches to implementing the Saga pattern:

1. **Orchestration**: A central coordinator manages the transaction, instructing each service on what to do.
2. **Choreography**: Services communicate with each other through events without a central coordinator.

This project focuses on the **Orchestration** approach, promoting a more centralized and flexible architecture.

## Project Overview

This repository provides a practical example of implementing the Saga pattern using choreography. It includes:

- **Microservices**: Multiple services participating in a saga.
- **Event Bus**: Facilitates communication between services via events.
- **Compensating Transactions**: Manages failures by reverting previous actions.
- **Docker Compose**: Simplifies the configuration and orchestration of services.

## Architecture

1. **Orders Service**: Initiates the saga by performing a local transaction and publishing an `order.created` event.
2. **Stock Service**: Listens to events like `reserve.product` and `revert.stock.reservation` and publishes its own `product.reserved` or `product.reservation.failed` event.
3. **Payment Service**: Listens to event `process.payment`, and publishes its own `payment.processed` or `payment.process.failed`.
4. **Orchestration Service**: Here we have two entities, Saga and Compensation. The entity Saga handle the happy path flow, listen to events like `order.created` and `product.reserved`. Meanwhile the Compensation entity handle de compensations, listen events like `product.reservation.failed` and `payment.process.failed`. These compensations events are send to StockService and PaymentService respectively to undoing product reservation and payment.
5. **Apache Kafka**: Ensures reliable communication between services.
6. **Compensation Mechanism**: If any service fails, compensating actions are triggered to maintain consistency.


