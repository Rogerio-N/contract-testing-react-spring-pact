## Descrição

![JS](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Jest](https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![KT](https://img.shields.io/badge/kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)
![Spring](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Pact](https://img.shields.io/badge/pact-black?style=for-the-badge&logo=&logoColor=white)

Repositório feito para demonstrar a implementação de testes de contrato usando a biblioteca [pact](https://pact.io/) nos contextos de consumidor e provedor.

## Aplicação

A aplicação feita para carregar apenas uma listagem de livros simples, sem tratamentos de erro ou conexão com um banco de dados persistente.

### Pré-requisitos

- Node 20
- Gradle
- Kotlin
- Java 21
- Docker
- Docker compose

### Como rodar

1 - Comece executando o pact-broker com o docker compose no root do projeto
```bash
docker-compose build
docker-compose up
```

2 - Execute primeiro os testes da pasta frontend (consumer)
```bash
cd frontend
npm run test # executa o teste
npm run test:publish # publica contratos no broker
```

3 - Execute os testes da pasta backend (provider)
```bash
cd backend
./gradlew test # executa o teste e publica o resultado no broker
```
