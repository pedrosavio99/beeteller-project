import React, {useState} from 'react';
import styles from "./styles.module.css";
import dolar from "../../../img/dl.png"

export default function ListItem({coin,id}) {

      return (
        <div >
            <li  className={styles.listCoin}>  
                <label htmlFor={id}>
                      <div className={styles.headerTable}>
                      <div className={styles.cardCoin}>
                        <div className={styles.symbolCoin}>
                          <img src={dolar} alt="description" width="64"/> 
                        </div>

                        <div className={styles.namelCoin}>
                          <div> Dollar </div>
                          <p>{coin[0]}</p>
                        </div>
                          
                          
                      </div>
                      <div> {coin[1]}</div>
                      <div> {coin[2]}</div>  
                      <div> {coin[3]}%</div> 
                      </div>
                </label>
        
            </li>       
                 
        </div>
   
      );
}

