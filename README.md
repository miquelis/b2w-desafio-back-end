# Desafio B2W de Backend

Para possibilitar a equipe de front criar essa aplicação, queremos desenvolver uma API que contenha os dados dos planetas.

#### Requisitos:

- A API deve ser REST

- Para cada planeta, os seguintes dados devem ser obtidos do banco de dados da aplicação, sendo inserido manualmente: Nome,Clima, Terreno.

- Para cada planeta também devemos ter a quantidade de aparições em filmes, que podem ser obtidas pela API pública do Star Wars: https://swapi.co/

#### Funcionalidades desejadas:

- Adicionar um planeta (com nome, clima e terreno)
- Listar planetas
- Buscar por nome
- Buscar por ID
- Remover planeta

### Instalação no terminal

A API utiliza o **NodeJS v10** ou superior.
Siga os passos abaixo para instalar e realizar o start da API:

1. Acesse o diretório do projeto.
2. `$ npm install`, para instalar todas as dependências.
3. `$ npm start`, para executar o projeto.
4. Será exibida a mensagem: **API rodando na porta 3000** no terminal.

### Rotas

Seguem todas as rotas da API:

| Rotas                                    | Método   | Descrição                                                                                                                                                                                                                            |
| ---------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `http://localhots:3000/`                 | **GET**  | Rota incial de boas vindas.                                                                                                                                                                                                          |
| `http://localhots:3000/api/login`        | **POST** | Rota para se autenticar na API e gerar o token. Para se autenticar será necessário enviar um json no body com {email: seuemail@provedor.com, password: password}. Exemplo: { email: joaosergio@outlook.com, password: bennuTv@2018 } |
| `http://localhots:3000/api/logout`       | **GET**  | Rota para realizar o logout, é necessário o token.                                                                                                                                                                                   |
| `http://localhots:3000/api/noticias`     | **GET**  | Rota para exibir todas as notícias, é necessário o token.                                                                                                                                                                            |
| `http://localhots:3000/api/noticias/:id` | **GET**  | Rota para exibir a notícia com base no **id** passado, é necessário o token.                                                                                                                                                         |

### Dependências

As dependência utilizadas na API são:

- body-parser
- express
- jsonwebtoken
- lodash
- underscore

### Teste

Caso queira realizar um teste de carga, foi implementado o [Artillery](https://artillery.io/) no projeto. Siga os passos abaixo para realizar o teste.

1. Faça o login na API para recuperar o token.
2. Abra o projeto e acesse o arquivo **carga.yml** que está dentro do diretório test.
3. Cole o token em x-access-token e faça as configurações do seu teste neste arquivo.
4. Faça o download da dependência Artillery no modo global: `$ npm install -g artillery`
5. Execute o comando `$ artillery run app/test/carga.yml` para realizar o teste.

> Desenvolvido por Raphael Miquelis
