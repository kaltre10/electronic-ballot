import { useState, createContext } from 'react';

const CustomersContext = createContext();

const CustomersProvider = (props) => {

    const customersLocal = localStorage.getItem('customers') 
            || localStorage.setItem('customers', JSON.stringify([
                {name: "Jason Hernández", doc: "PASS", num: 149889214},
            ]));

    const [ customers, setCustomers ] = useState(JSON.parse(customersLocal));

    return ( 
        <CustomersContext.Provider
            value={{
                customers,
                setCustomers
            }}
        >
            {props.children}
        </CustomersContext.Provider>
     );
}
 
export { CustomersContext, CustomersProvider }