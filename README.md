# Saga Pattern with Choreography

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

Welcome to the **Saga Pattern with Choreography** project! This repository demonstrates the implementation of the Saga pattern using choreography to manage distributed transactions in a microservices architecture. By leveraging choreography, each microservice communicates with others through events, ensuring a decentralized and resilient system.

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

This project focuses on the **Choreography** approach, promoting a more decentralized and flexible architecture.

## Project Overview

This repository provides a practical example of implementing the Saga pattern using choreography. It includes:

- **Microservices**: Multiple services participating in a saga.
- **Event Bus**: Facilitates communication between services via events.
- **Compensating Transactions**: Manages failures by reverting previous actions.
- **Docker Compose**: Simplifies the configuration and orchestration of services.

## Architecture

1. **Orders Service**: Initiates the saga by performing a local transaction and publishing an `order-created` event. It also listens to the `stock-unavailable` topic. If triggered, it changes the order status to "CANCELLED".
2. **Stock Service**: Listens to events from the Payment Service, performs its transaction, and publishes its own `stock-available` or `stock-unavailable` event.
3. **Payment Service**: Completes the saga by performing the final transaction, publishing the `payment-confirmed` or `payment-not-confirmed` event.
4. **Apache Kafka**: Ensures reliable communication between services.
5. **Compensation Mechanism**: If any service fails, compensating actions are triggered to maintain consistency.
