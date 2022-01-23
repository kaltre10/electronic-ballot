import {useState} from 'react';
import './customers.css'

const Customers = () => {
    const [customers, setCustomers] = useState([
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},
        {name: "Jason Hernandez", doc: "PASS", num: 149889214},

    ]);
    return ( 
        <div className='customers'>
            <div className='customers-header'>
                <h2>Clientes</h2>
                <button className='btn btn-registrar'>AGREGAR</button>
            </div>
            <ul>
                {customers.map( c => (
                    <li key={c.num}>
                        <span>{c.name}</span>
                        <span>{c.doc}: {c.num}</span>
                        <span className='delete-customer'> ❌ </span> 
                    </li>
                ))}
            </ul>
        </div>
    );
}
 
export default Customers;