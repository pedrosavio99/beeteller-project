import styles from "./styles.module.css";
import { useState, useEffect } from "react";//use efect para podermos usar ciclo de vida em funções
import Navbt from "../Navbar";
import refresh from "../../img/refresh.png"
import dolar from "../../img/dl.png"
import ListItem from "./ListItem";
import axios from "axios";


const Main = () => {
    //guardar moedas
    const [cotacoes, setCotacoes] = useState([]) //dados para listagem
    const [usdbrl,setusdbrl] =useState(0); //card usdbrl
    const [btceur,setBtceur] = useState(0); //card btcur
    const [btcusd,setBtcusd] = useState(0); //btcusd


    const url = 'http://localhost:8080'; //essa variavel aqui é so pra facilitar na hora que uparmos no heroku

    //função pra chamar todas as dependencias das apis e fazer o refresh
    async function refreshandget() {
        const response = await axios.get(
            `${url}/api/usdbrl`
        );

        const response2 = await axios.get(
            `${url}/api/btceur`
        );

        const response3 = await axios.get(
            `${url}/api/btcusd`
        );


      
        const response4 = await axios.get(
            `${url}/api/usdbrl-history`
        );
            //PARTE PARA ENCAPSULAR OS VALORES DA API EM UM CONTEXTO
        var dataDoll = []
        var i = 0
        while(i<(response4.data[0].length)){
            var time = (response4.data[0][i]["timestamp"])
            var date = new Date(time*1000); // converte para data
            var min = (response4.data[0][i]["low"]);
            var max = (response4.data[0][i]["high"]);
            var pct = (response4.data[0][i]["pctChange"])
            var dat = (date.toLocaleDateString("pt-BR"));
            var capsula = []
            capsula.push(dat)
            capsula.push(min)
            capsula.push(max)
            capsula.push(pct) 
            dataDoll.push(capsula)  
            i=i+1
        }
        setCotacoes(dataDoll)

        setusdbrl(response.data[0])
        setBtceur( parseFloat(response2.data).toFixed(2))
        setBtcusd( parseFloat(response3.data).toFixed(2))
    
    }

    //chamando a api na inicialização da aplicação
    useEffect(()=>{
        refreshandget()
    },[])

  

    //função para atualizar os dados da pagina
    const handleRefresh = () => {
		console.log("Refresh")
	};


    //função para remover o token de autenticação do armazenamento local
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
			<Navbt />
           
            <div className={styles.utills}>
                <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                </button>
            </div>

            
            <div className={styles.utills}>
                <div>
                    <h1 className={styles.coin}> Coins </h1>
                </div>
                
                <button className={styles.white_btn2}>
               
                     {/* onClick={handleRefresh} */}
                    
                    <img src={refresh}  onClick={refreshandget} alt="description" width="28"/> 
                
                </button>
            </div>
            
         {/* CARTÕES INICIAIS - TRANFORMAR EM COMPONENTE */}

            <div className={styles.cards}>
                <section className={styles.sec1}>
                    <div  className={styles.card}>
                        <div>
                            <h1>BRL/USD</h1>
                            <div className={styles.price}>
                                <h1 className={styles.cifra}>R$</h1>
                                <h1 className={styles.price2}>{usdbrl} </h1>
                            </div> 
                            <p className={styles.namecoin}>American Dollar </p>
                        </div>

                        <div> 
                            <img src={dolar} alt="description" width="64"/> 
                        </div>
                    </div>
                </section>
                <section className={styles.sec1}>
                    <div  className={styles.card}>
                    <div>
                            <h1>BTC/EUR</h1>
                            <div className={styles.price}>
                                <h1 className={styles.cifra}>R$</h1>
                                <h1 className={styles.price2}>{btceur} </h1>
                            </div> 
                           
                        </div>

                        <div> 
                            <img src={dolar} alt="description" width="64"/> 
                        </div>
                    </div>
                </section >

                <section className={styles.sec1}>
                    <div  className={styles.card}>
                    <div>
                            <h1>BTC/USD</h1>
                            <div className={styles.price}>
                                <h1 className={styles.cifra}>R$</h1>
                                <h1 className={styles.price2}>{btcusd}</h1>
                            </div> 
                            
                        </div>

                        <div> 
                            <img src={dolar} alt="description" width="64"/> 
                        </div>
                    </div>

                </section>
            </div>

            {/* PARTE DA LISTAGEM */}

            <h1 className={styles.coin}> Quotations </h1>

            <div className={styles.headerTable}>
                    <div>Coin</div>
                    <div>Min</div>
                    <div>Max</div>  
                    <div>fluctuation</div> 
            </div>

            <div className={styles.listCoindiv}>  
                <ul className={styles.listCoin} >
                    {
                        cotacoes.map((dol, index)=>(
                            <ListItem coin={dol} key={index} id={index}/>
                        ))
                    }
                </ul>  
            </div>
		</>
	);
};

export default Main;