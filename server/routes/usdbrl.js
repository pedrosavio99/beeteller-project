const router = require("express").Router();
const request = require('request')

const moedas = 'USD-BRL,BTC-EUR,BTC-USD'

const options ={ 
    url: `https://economia.awesomeapi.com.br/last/${moedas}`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
}

var infoCoin = []
const dollar_brl = async function(erro,res,body){
    let json = JSON.parse(body)
    cotacao = json.USDBRL['bid']
    nome = json.USDBRL['name']
    alta = json.USDBRL['high']
    baixa = json.USDBRL['low']
    dia =  json.USDBRL['create_date']
    infoCoin.push(cotacao,nome,alta,baixa,dia)
    console.log(cotacao, dia, nome, alta)
}

request(options, dollar_brl)

router.get("/", async (req, res) => {
	try { 
        await request(options, dollar_brl)
        res.send(infoCoin )
        infoCoin = []  
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;