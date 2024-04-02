# Tabela de Classificação: Trybe Futebol Clube!

Esse projeto trata-se de um CRUD com autenticação de usuário que alimenta uma aplicação Front-End e seus testes, utilizando bibliotecas Node como o Sequelize, Express, MySQL2, mocha, jest, jsonwebtoken e bcryptjs. 

O Back-End foi desenvolvido por mim com endpoints que fazem a autenticação do usuário com base nos dados do banco e fornecem informações sobre as partidas, times e sua classificação. 
É possível criar novas partidas, ver as informações de partidas e classificação e atualizar os dados de uma partida.
A encriptação das senhas no banco de dados é feita utilizando o bcryptjs e o banco já é populado automaticamente pela configuração que desenvolvi do sequelize e dos dockerfile.

Todas as informações exibidas são trabalhadas e fornecidas pelo back-end, o front-end foi desenvolvido e fornecido pela Trybe (escola de desenvolvimento web) e serve apenas para demonstração visual dos dados recebidos.

O projeto utiliza o docker-compose para orquestrar os 3 contâiners necessários: 
- back-end (disponivel em `http://localhost:3001` )
- front-end (disponíbel em `http://localhost:3000` )
- banco de dados MySQL (db) (acesso por `http://localhost:3306`) 

## Iniciando o projeto localmente:
- Tenha instalado o Node versão igual ou superior à 16.14.0 LTS.
- Tenha instalado o Docker Compose na versão 2.5 ou superior.
- Clone esse repositório em uma pasta com: **git clone git@github.com:devItaloAraujo/trybe-futebol-clube.git**
- Instale as dependencias do projeto com o comando: **npm run install:apps**
- Rode o docker compose, execute o comando: **npm run compose:up**
- Experimente os testes locais que desenvolvi com o comando:  **npm run test**
- Interaja com a exibição dos dados no front-end em: **http://localhost:3000**
