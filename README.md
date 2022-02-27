


 
 ## Desafio Beeteller - Desenvolvedor Full Stack
[Conferir desafio](https://github.com/beetellergroup/selecao-full-stack)
<br />Desafio realizado utilizando React para o front-end e NodeJs para o backend.

 O desafio é criar um sistema de login com autenticação e um dashboard para exibição de cotações em tempo real vindas das apis indicadas no desafio.
 ### Codigo Live para teste e visualização(Heroku):

[Cotações Beeteller - Live](https://beetelertest-front.herokuapp.com/login)

<br /><br />
## Manual de instalação

1. Clone esse repositorio
```javascript
git clone https://github.com/pedrosavio99/beeteller-project.git
```


2. Baixar e instalar o Node em sua maquina.
[Baixar NodeJs](https://nodejs.org/en/)


3. Entre na pasta "client"em seu editor de texto e instale as dependencias do Node:
```javascript
npm install
```


4. Entre na pasta "server"em seu editor de texto e instale as dependencias do Node:
```javascript
npm install
```


5. Crie as variaveis de ambiente do servidor dentro da pasta server:
Dentro da raiz da pasta server crie um arquivo chamado .env e cole essas variavéis de ambiente( ps. são as minha variaveis de teste então pode utilizar sem problemas)
```javascript
DB = 'mongodb+srv://pedrosavio99:mce0yM0mRPMWqrTG@cluster0.aqnti.mongodb.net/teste-db?retryWrites=true&w=majority'
JWTPRIVATEKEY = 'beetellergroup'
SALT = 10
```

6. Entre no terminal dentro da pasta "server" e rode o comando de inicio do node para iniciar seu servidor de backend
```javascript
npm start
```

7. Entre no terminal dentro da pasta "client" e rode o comando de inicio do node para iniciar sua apliação front-end e consumir os dados do backend inicializado anteriormente

```javascript
npm start
```



# Roadmap e desafios do projeto


O projeto fo dividido em duas partes principais:
1. O desenvolvimento de um backend capaz de retornar a autenticação de um sistema de login e as cotações de algumas moedas.
1. Criação de um front-end responsivo para a aplicação.


# Como desenvolvi o backend:


Criei o diretorio "server" e dentro dele instalei as dependencias necessárias para o gerenciamento das rotas e armazenamento dos dados de login dos usúarios.
```javascript
npm init --yes
npm i express mongoose dotenv nodemon cors
```

Criação dos Middleware dentro do arquivo index.js e a porta que usaremos no ambiente de desenvolvimento .

Criação do banco de dados MongoDb dentro do arquivo db.js

Criação do arquivo para armazenamento de variaveis de ambiente o .env 

<br/><br/>
### back do login
Para desenvolver o login é necessário criar um modelo user.js em models para que o banco reconheça o padrão de dados enviados.

para autenticar esses dados usaremos o JWT 

```javascript
npm i jsonwebtoken joi joi-password-complexity
```

Não podemos mostrar a senhar do usuário precisamos  de uma forma de mascarar ela...
criptografar senhas em hash com o bcrypt.

```javascript
npm i bcrypt
```

criação da pasta routes e suas rotas ambas são post

rota de cadastro de novos usuários - users.js
rota de login e autenticação do user - auth.js



### back das Cotações
Criação de rotas para fornecer os dados das moedas para o Front-end
<br/>
rota para pegar os dados dos ultimos 5 dias do BTC/USD:  5daysbtcusd.js
rota para pegar os dados dos ultimos 5 dias do USD/BRL:   5daysdollar.js
rota para cotação do BTC/EUR:   btceur.js
rota para cotação do BTC/USD:   btcusd.js
rota para cotação do USD/BRL:   usdbrl.js

# Como desenvolvi o frontend
<br/>
Criação do app em React:

```javascript
npx create-react-app client
```


instalar o axios para podermos realizar requisiçoes http e chamar nosso backend
```javascript
 npm i axios react-router-dom
```

Criar os componentes React  e suas estilizações

Signup 
Login 
Main 
navbar

### front do dashboard (Main)
Criar o componente item de lista para poder listar as cotações do dollar de acordo com os dados de nossa api.

Dentro do index.js do Main desenvolver o função que integra o front com o backend e guarda seus dados em promisses do React, essa função é renderizada ao carregar a pagina ou clicar no botão de "refresh"

refreshandget()





## Sobre o Autor
<img   style="border-radius: 50%"  align="left" width="190" height="190" margin-right="150px"  src="https://lh3.googleusercontent.com/pw/AM-JKLUq-TgjEzhoVY_CtieDZgnZNOoIGyAubOEKisc2FKt7HMCSVv4DGHZjixw4Z2_yomTtgUKr0kxFUyUdmOuTyJnQfhgzXEyOVk6JoajO58wYDtWcrDF-EPRjaE1hj2EsZtM-OYgQsDjHGjdny1yGetxeWw=s250-no?authuser=0"> Oi, meu nome é Pedro Savio, faço engenharia de computação no IFPB, sou desenvolvedor Fullstack e esse é o meu linkedin,  [ir para meu linkdin](https://www.linkedin.com/in/pedro-s-04a300129/).

