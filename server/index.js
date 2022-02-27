
require("dotenv").config();  // esse arquivo possibilita a criação de variaveis de ambiente 
const express = require("express"); // esse fremework do node permite gerenciar requisições da arquitetura http(get post, put e delete)
const app = express();
const cors = require("cors"); // permite nossa aplicação rodar em dominios espeificados no desenvolvimento
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const usdtRoute = require("./routes/usdbrl"); //apartir daqui são as rotas das nossas apis de moedas
const btceurRoutes = require("./routes/btceur");
const btcusdtRoutes = require("./routes/btcusd");
const fivebtcRoutes = require("./routes/5daysbtcusd")
const fiveusdRoutes = require("./routes/5daysdollar")


// conexão com o nosso banco de dados
connection();

// middlewares  são os intemediarios entre backand e frontand
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);//criar conta
app.use("/api/auth", authRoutes);//logar
app.use("/api/usdbrl", usdtRoute);//chamar o dolar
app.use("/api/btceur", btceurRoutes); //chamar o BTC-EUR
app.use("/api/btcusd", btcusdtRoutes); //chamar o BTC-usd
app.use("/api/btcusd-history", fivebtcRoutes); //chamar o historico de btc-usd
app.use("/api/usdbrl-history", fiveusdRoutes);//chamar o hitorico dolar

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));