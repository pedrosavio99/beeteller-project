//api pra consumo:   https://economia.awesomeapi.com.br/json/daily/USD-BRL/5
//api com problema
const router = require("express").Router();
const request = require('request')
const moedas = 'BTC-USD'

//em options enviamos o methodo que queremos e o calback é a respota que vem em json da api
//request(options,callback)

const options ={ 
    url: `https://economia.awesomeapi.com.br/json/daily/${moedas}/5`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
}

var infoCoin = []

const callback_todas_cotacoes = async function(erro,res,body){
    let json = JSON.parse(body)
    infoCoin.push(json)
    console.log(json)
}



request(options,callback_todas_cotacoes)



router.get("/", async (req, res) => {
	try {  
        await request(options, callback_todas_cotacoes)
        res.send(infoCoin )
        infoCoin = []
                
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;


/////



