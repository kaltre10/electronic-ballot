import  { useState, Fragment } from 'react';
import Form from './form/Form';
import Calculate from './calculate/Calculate';
import home from '../images/home.png';
import config from '../images/config.png';
import { Link } from "react-router-dom";
import Modal from '../modal';
import Load from './load/Load';
import SearchCustomers from './searchCustomers/SearchCustomers';

const Home = () => {


    const [ result, setResult] = useState(0);
    const [ modal, setModal ] = useState(false);

    const openModal = (modal) => setModal(!modal);

    return ( 
        <Fragment>
        <SearchCustomers />
        <div className="App">
            <div className="header">
                <div className='ico-config'>
                    <Link to='/'><img src={home} /></Link>
                    <Link to='/config'><img src={config} /></Link>
                </div>
                <h1>Boleta Electrónica</h1>
            </div>
            <div className="container">
                <div className="ticket">
                    <Form setResult={setResult} result={result} openModal={openModal} />
                </div>
                <div className="calculate">
                    <Calculate result={result} />
                </div>
            </div>
        </div>
        {
            modal &&
                <Modal>
                    <Load />
                </Modal>
        }
        </Fragment>
     );
}

export default Home;