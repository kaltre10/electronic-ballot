import { useState } from 'react';
import './money.css';

const Money = () => {

    const [ money, setMoney ] = useState([
        {id: 1, name: "PEN", buy: 0, sell: 0, main: true},
        {id:2, name: "USD", buy: 3.85, sell: 3.9, main: false},
        {id: 3, name: "CLP", buy: 3.85, sell: 3.9, main: false},
        {id: 4, name: "COP", buy: 3.85, sell: 3.9, main: false},
        {id: 5, name: "EUR", buy: 4.4, sell: 4.5, main: false}
    ])

    return ( 
        <div className="money">
            <div style={{display: "flex", justifyContent: "center", padding:"20px 0"}}>
                <h2>Monedas</h2>
                <button className='btn btn-registrar'>AGREGAR</button>
            </div>
            
                {money.map( money => (
                    <div key={money.id} className='input-money'>
                        <p>{money.name}</p>  
                        COMPRA:<input value={money.buy} />
                        VENTA:<input value={money.sell} />
                        <label>Principal</label>
                        <input type="checkbox" checked={money.main} />
                    </div>
                ))} 
        </div>
     );
}
 
export default Money;