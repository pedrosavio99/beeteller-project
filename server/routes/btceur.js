const router = require("express").Router();
const request = require('request')
//UTILIZANDO A API DO KRAKEN
const options ={ 
    url: `https://api.kraken.com/0/public/Ticker?pair=XBTeur`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
}

var infoCoin = []
const callback_btc_eur = async function(erro,res,body){
    let json = JSON.parse(body)
    cotacao = json.result.XXBTZEUR['a'][0]
    infoCoin.push(cotacao)
    //console.log(cotacao)
}

request(options, callback_btc_eur)

router.get("/", async (req, res) => {
	try {  
        await request(options, callback_btc_eur)
        res.send(infoCoin )
        infoCoin = []
                
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;