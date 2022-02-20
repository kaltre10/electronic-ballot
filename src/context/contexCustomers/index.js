import { useState, createContext } from 'react';

const CustomersContext = createContext();

const CustomersProvider = (props) => {

    const customersLocal = localStorage.getItem('customers') 
            || localStorage.setItem('customers', JSON.stringify([
                {name: "Jason Hernández", doc: "PASS", num: 149889214},
            ]));

    const [ customers, setCustomers ] = useState(JSON.parse(customersLocal));
    const [ search, setSearch ] = useState(false);
    const [ searchCustomers, setSearchCustomers ] = useState('');
    const [ resultSearch, setResultSearch ] = useState([]);
    const [ inputCustomers, setInputCustomers ] = useState({name: '', doc: '', num: ''});

    const handleSearch = () => {
        let newArray = customers.map(c => c)
                                .filter(c => c.name.toLowerCase()
                                .includes(searchCustomers.toLowerCase()));

        setResultSearch([ ...newArray]);
         if(searchCustomers === '') setResultSearch([]); 
     }     

    return ( 
        <CustomersContext.Provider
            value={{
                customers,
                search,
                searchCustomers,
                resultSearch,
                inputCustomers,
                setCustomers,
                setSearch,
                setSearchCustomers,
                handleSearch,
                setResultSearch,
                setInputCustomers
            }}
        >
            {props.children}
        </CustomersContext.Provider>
     );
}
 
export { CustomersContext, CustomersProvider }