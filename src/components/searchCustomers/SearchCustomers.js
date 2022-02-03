import { useState, useContext } from 'react'; 
import { CustomersContext } from '../../context/contexCustomers';
import './searchCustomers.css';

const SearchCustomers = () => {
    const { search, setSearch, searchCustomers, setSearchCustomers, resultSearch, handleSearch, setResultSearch} = useContext(CustomersContext);

    const handleInput = e => {
        setSearchCustomers(e.target.value);
        handleSearch();
        if(e.target.value === '') {
            setResultSearch([]);
            setSearch(false);
        }
    }  
    
    const handleSelect = (customer) => {
        setSearch(false);
    }

    // const handleContainer = () => {
    //     if(document.querySelector('.container-customers').className === 'container-customers') setSearch(false);
        
    // }

    return (
        search && 
        <div /*onClick={e => handleContainer(e)}*/ className='container-customers'>
            <div className='customers-card'>
                <h2>Buscar Cliente:</h2>
                <input onChange={e => handleInput(e)} value={searchCustomers}/>
                <div className='customers-search'>
                    {resultSearch.length === 0 && <span>No hay Resultados...!</span>}
                    {resultSearch.map( c => (
                        <p key={c.num} onClick={() => handleSelect(c)}>{c.doc} {c.num} {c.name}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default SearchCustomers;