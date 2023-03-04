# PostHere!

Micro rede social desenvolvida com express, ejs e passportjs para praticar minhas habilidades com autenticação usando essas tecnologias.

Projeto construído para uma lição do [The Odin Project](https://www.theodinproject.com).

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Hierarquia de usuários

O website se trata basicamente de uma mini rede social, qualquer pessoa consegue
ver os posts, mas para criar novos posts é preciso criar uma conta.

Usuários com conta conseguem postar, mas, assim como os usuários não logados,
eles não conseguem visualizar o autor ou o horário da postagem.

Para conseguir visualizar essas informações o usuário precisa se tornar VIP, o
que nesse caso significa clicar em um botão enquanto estiver logado e digitar o
código de acesso conforme definido pela variável `ACCESS_CODE` do arquivo `.env`.

Por fim, usuários que são administradores ainda tem a possibilidade de excluir
qualquer post. A interface para exclusão de posts foi implementada, mas não foi
implementada nenhuma forma de se tornar administrador por meio do próprio site
por ser uma funcionalidade crítica.

Caso dejese tornar um usuário administrador você terá que editar o usuário
diretamente no banco de dados, basta definir o campo `isAdmin` como `true`. Para
a interface de exclusão aparecer é preciso que usuário tambem seja zip.

## Executando o projeto localmente

Para executar esse projeto localmente você precisa ter o
[Node e o npm](https://nodejs.org/en/) instalados em sua máquina.

1. Baixe os arquivos do projeto

2. Abra a pasta no terminal e execute o comando `npm install` para instalar as
   dependências

3. Faça uma cópia do arquivo `.env.example` e renomeie para `.env`

4. Preencha as variáveis do arquivo `.env` conforme as instruções a seguir

   - `DB_URL`

     - Tipo string
     - URL de conexão com o banco de dados mongodb que você pretende usar com
       o projeto

   - `PORT`

     - Tipo number
     - Porta em que o servidor será executado

   - `SESSION_SECRET`

     - Tipo string
     - String de caracteres que será utilizada para calcular o hash da sessão

   - `VIP_CODE`

     - Tipo string
     - Código que o usuário precisa digitar para se tornar VIP

   - `USE_BACKSLASH_FOR_FILES_PATH`

     - Tipo boolean
     - Define se o app deve usar `/` ou `\` na hora de gerar o caminho dos
       arquivos de imagem enviados pelo usuário
     - Caso você esteja executando o projeto no Windows, defina como `true`

5. Volte a pasta do projeto aberta no terminal e execute o comando `npm run dev`,
   se tudo estiver configurado corretamente você deve ver as mensagens
   `SERVER RUNNING` e `CONNECTED TO DATABASE`.
