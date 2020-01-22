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
2. Renomeie o arquivo .env.example para .env e altere as configurações.
3. `$ npm install`, para instalar todas as dependências.
4. `$ npm start`, para executar o projeto.
5. Será exibida a mensagem: **API rodando na porta 3000** no terminal.

### Rotas

Seguem todas as rotas da API:

| Rotas                                           | Método     | Descrição                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http://localhot:3000/`                         | **GET**    | Rota incial de boas vindas.                                                                                                                                                                                                                                          |
| `http://localhot:3000/auth/register`            | **POST**   | Rota para se registrar na API e gerar o token. Para se registrar será necessário enviar um json no body com {name: seu nome, email: seuemail@provedor.com, password: password}. Exemplo: {name: João Sergio, email: joaosergio@outlook.com, password: b2w@2020 }     |
| `http://localhot:3000/auth/authenticate`        | **POST**   | Rota para se autenticar na API e gerar o token. Para se autenticar será necessário enviar um json no body com {email: seuemail@provedor.com, password: password}. Exemplo: { email: joaosergio@outlook.com, password: b2w@2020 }                                     |
| `http://localhot:3000/auth/forgot_password`     | **POST**   | Rota para recuperar a senha. Para recuperar será necessário enviar um json no body com {email: seuemail@provedor.com}, onde será enviado um email com o token para alteração. Exemplo: { email: joaosergio@outlook.com}                                              |
| `http://localhot:3000/auth/reset_password`      | **POST**   | Rota para resetar a senha. Para resetar será necessário enviar um json no body com {email: seuemail@provedor.com, password: nova sennha, token: o token enviado no email}. Exemplo: { email: joaosergio@outlook.com, password: b2w@2019, token: token do email}      |
| `http://localhot:3000/planets`                  | **GET**    | Rota para exibir todos os planetas, é necessário o token.                                                                                                                                                                                                            |
| `http://localhot:3000/planets?name=PlanetsName` | **GET**    | Rota para exibir o planeta com base no **nome**, é necessário o token. Exemplo: http://localhot:3000/planets?name=Alderaan                                                                                                                                           |
| `http://localhot:3000/planets/:id`              | **GET**    | Rota para exibir o planeta com base no **id** passado, é necessário o token.                                                                                                                                                                                         |
| `http://localhot:3000/planets`                  | **POST**   | Rota para criar um planeta passado os seguintes dados como json no body {name: nome do planeta, climate: tipo de clima, terrain: tipo de terreno }, é necessário o token. Exemplo: {"name": "Dagobah", "climate": "murky", "terrain": "swamp, jungles" }             |
| `http://localhot:3000/planets/:id`              | **PUT**    | Rota para editar um planeta passado o **id** e os seguintes dados como json no body {name: nome do planeta, climate: tipo de clima, terrain: tipo de terreno }, é necessário o token. Exemplo: {"name": "Dagobah", "climate": "murky", "terrain": "swamp, jungles" } |
| `http://localhot:3000/planets/:id`              | **DELETE** | Rota para deletar um planeta passado o **id**, é necessário o token.                                                                                                                                                                                                 |

OBS: O token expira em um dia!

### Dependências

As dependência utilizadas na API são:

- bcryptjs
- dotenv-safe
- body-parser
- express
- jsonwebtoken
- mongoose
- node-fetch
- nodemailer
- nodemailer-express-handlebars
- path

### Teste

Caso queira realizar um teste de carga, foi implementado o [Artillery](https://artillery.io/) no projeto. Siga os passos abaixo para realizar o teste.

1. Faça o login na API para recuperar o token.
2. Abra o projeto e acesse o arquivo **carga.yml** que está dentro do diretório test.
3. Cole o token em x-access-token e faça as configurações do seu teste neste arquivo.
4. Faça o download da dependência Artillery no modo global: `$ npm install -g artillery`
5. Execute o comando `$ artillery run app/test/carga.yml` para realizar o teste.

> Desenvolvido por Raphael Miquelis
