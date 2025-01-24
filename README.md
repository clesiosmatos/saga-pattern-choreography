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
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Welcome to the **Saga Pattern with Choreography** project! This repository demonstrates the implementation of the Saga pattern using choreography for managing distributed transactions in a microservices architecture. By leveraging choreography, each microservice communicates with others through events, ensuring a decentralized and resilient system.

## What is the Saga Pattern?

The **Saga Pattern** is a design pattern used to manage complex transactions that span multiple microservices. Instead of using distributed transactions, which can be cumbersome and hard to manage, the Saga pattern breaks down a transaction into a series of smaller, manageable steps (local transactions). Each step is executed by a separate microservice, and if any step fails, compensating actions are triggered to maintain data consistency.

### Key Benefits

- **Scalability**: Each service can scale independently.
- **Resilience**: Failures in one service do not cascade to others.
- **Flexibility**: Services can evolve independently without tight coupling.

## Choreography vs. Orchestration

There are two primary approaches to implementing the Saga pattern:

1. **Orchestration**: A central coordinator manages the transaction, instructing each service on what to do.
2. **Choreography**: Services communicate with each other through events without a central coordinator.

This project focuses on the **Choreography** approach, promoting a more decentralized and flexible architecture.

## Project Overview

This repository provides a practical example of implementing the Saga pattern using choreography. It includes:

- **Microservices**: Multiple services that participate in a saga.
- **Event Bus**: Facilitates communication between services via events.
- **Compensating Transactions**: Handles failures by reverting previous actions.
- **Docker Compose**: Simplifies the setup and orchestration of services.

## Architecture

![Architecture Diagram](docs/architecture-diagram.png)

1. **Service A**: Initiates the saga by performing a local transaction and publishing an event.
2. **Service B**: Listens to events from Service A, performs its transaction, and publishes its own event.
3. **Service C**: Completes the saga by performing the final transaction.
4. **Event Bus**: Ensures reliable communication between services.
5. **Compensation Mechanism**: If any service fails, compensating actions are triggered to maintain consistency.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Comes bundled with Docker Desktop.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/clesiosmatos/saga-pattern-choreography.git
   cd saga-pattern-choreography
   ```

2. **Configure Environment Variables**

   Ensure all necessary environment variables are set in the `.env` file. Modify as needed.

### Running the Project

Use Docker Compose to build and start all services:

```bash
docker-compose up --build
```

This command will:

- Build Docker images for each microservice.
- Start all containers, including the event bus.
- Initialize any necessary databases or dependencies.

### Accessing Services

- **Service A**: [http://localhost:8001](http://localhost:8001)
- **Service B**: [http://localhost:8002](http://localhost:8002)
- **Service C**: [http://localhost:8003](http://localhost:8003)
- **Event Bus**: [http://localhost:9000](http://localhost:9000)

## Usage

1. **Initiate a Saga**

   Send a request to Service A to start the saga:

   ```bash
   curl -X POST http://localhost:8001/start-saga
   ```

2. **Monitor Events**

   Check the logs of each service to see the flow of events and transactions.

3. **Simulate Failures**

   To test compensating transactions, you can introduce failures in any service and observe how the system maintains consistency.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, feel free to reach out:

- **Email**: clesiosmatos@example.com
- **GitHub**: [@clesiosmatos](https://github.com/clesiosmatos)

---

Happy coding! 🚀
