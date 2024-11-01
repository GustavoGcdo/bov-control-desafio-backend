
# Desafio Técnico - BovControl

Este repositório contém uma API desenvolvida em Node.js para o desafio técnico da empresa BovControl.

## Pré-requisitos

- Node.js (versão recomendada: 20.x)
- NPM

## Configuração de Variáveis de Ambiente

Antes de iniciar o projeto, configure as variáveis de ambiente necessárias. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
# Exemplo de variáveis de ambiente
PORT=3000 
USERNAME_DEFAULT=bovcontrol
PASSWORD_DEFAULT=pass
JWT_SECRET=secret-key
```

**OBS:** Para fins te teste e demonstração a autenticação usa um usuário default por variavel de ambiente para que seja feita a autenticação. Em casos reais este usuário seria buscado de uma base.

## Instalação

Para instalar as dependências do projeto, execute o comando abaixo:

```bash
npm install
```

## Rodando o Projeto

Para iniciar a API em modo de desenvolvimento:

```bash
npm run dev
```

Para iniciar a API em produção:

```bash
npm start
```


## Testes

Este projeto inclui testes unitarios para garantir o funcionamento correto da aplicação.
Existem dois comandos principais para os testes:

- Executar todos os testes:

```bash
npm test
```

- Executar testes em modo de monitoramento (ideal para desenvolvimento):

```bash
npm test:watch
```

## Documentação e Insomnia

A documentação da API está disponível no Swagger em [http://localhost:3000/docs](http://localhost:3000/docs) após iniciar o servidor.

A requests do Insomnia estão dentro da pasta ``` ./insomnia-requests ```


## Contato

gustavo.gcdo@gmail.com


