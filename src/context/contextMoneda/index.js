import { useState, createContext } from 'react';

const MonedaContext = createContext();

const MonedaProvider = (props) => {

    const moneyLocal = localStorage.getItem('money') 
            || localStorage.setItem('money', JSON.stringify([
                    {id: 1, name: "PEN", buy: 1, sell: 1, main: true},
                    {id: 2, name: "USD", buy: 3.85, sell: 3.9, main: false},
                ]));

    const [ money, setMoney ] = useState(JSON.parse(moneyLocal));

    // {id: 1, name: "PEN", buy: 1, sell: 1, main: true},
    // {id: 2, name: "USD", buy: 3.85, sell: 3.9, main: false},
    // {id: 3, name: "CLP", buy: 3.85, sell: 3.9, main: false},
    // {id: 4, name: "COP", buy: 3.85, sell: 3.9, main: false},
    // {id: 5, name: "EUR", buy: 4.4, sell: 4.5, main: false}

    return ( 
        <MonedaContext.Provider
            value={{
                money,
                setMoney
            }}
        >
            {props.children}
        </MonedaContext.Provider>
     );
}
 
export { MonedaContext, MonedaProvider }