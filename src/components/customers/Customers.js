import {useState, Fragment, useContext} from 'react';
import Modal from '../../modal';
import ModalConfirm from '../modalConfirm/ModalConfirm';
import ModalCustomer from '../modalCustomer/ModalCustomer';
import { CustomersContext } from '../../context/contexCustomers';
import './customers.css'

const Customers = () => {

    const { customers, setCustomers } = useContext(CustomersContext);

    const [modal, setModal] = useState(false);
    const [modalCustomer, setModalCustomer] = useState(false);
    const [formError, setFormError] = useState(false);
    const [formCustomer, setFormCustomer] = useState({ name: '', doc: 'DNI', num: '' });
    const [data, setData] = useState({});

    const deleteCustomers = (id) => {
        const newCustomers = customers.filter(c => c.num !== id);
        setCustomers(newCustomers);
        localStorage.setItem('customers', JSON.stringify(newCustomers));
        setModal(false);
    }

    const handleDelete = (id) => {
        setModal(true);
        setData(id)
    }

    const handleAddCustomer = () => {
        setModalCustomer(true);
    }

    const handleFormCurstomer = (e) => {
        setFormError(false);
        setFormCustomer({
            ...formCustomer,
            [e.target.name]: e.target.value
        });
    }

    const addCustomer = () => {
        const { name, doc, num } = formCustomer;
        if(name === '' || doc === '' || num === ''){
            setFormError(true);
            return;
        }
        setCustomers([ ...customers,  formCustomer]);
        localStorage.setItem('customers', JSON.stringify([ ...customers,  formCustomer]));
        setModalCustomer(false);
        setFormCustomer({ name: '', doc: 'DNI', num: '' });
    }

    return ( 
        <Fragment>
            <div className='customers'>
                <div className='customers-header'>
                    <h2>Clientes</h2>
                    <button onClick={() => handleAddCustomer()} className='btn btn-registrar'>AGREGAR</button>
                </div>
                <ul>
                    {customers.map( c => (
                        <li key={c.num}>
                            <span>{c.name}</span>
                            <span>{c.doc}: {c.num}</span>
                            <span className='delete-customer' onClick={() => handleDelete(c.num)}> ❌ </span> 
                        </li>
                    ))}
                </ul>
            </div>
            { modal &&
                <Modal>
                    <ModalConfirm 
                        title='Desea Eleminar este Cliente?'
                        setModal={setModal}
                        data={data}
                        fun={deleteCustomers}
                    />
                </Modal>
            }
            { modalCustomer &&
                <ModalCustomer>
                    <div className='modal-container'>
                        <h2>AGREGAR CLIENTE:</h2>
                        <input name='name' className={formError && "input-error"} placeholder='Nombre Completo' onChange={e => handleFormCurstomer(e)} autoComplete='off' />
                        <div className="select">
                            <select name='doc' onChange={e => handleFormCurstomer(e)}>
                                <option value="DNI">DNI</option>
                                <option value="PASS">PASS</option>
                                <option value="CE">CE</option>
                                <option value="RUC">RUC</option>
                            </select>
                            <input type="number" className={formError && "input-error"} name='num' placeholder='Numero de Documento' autoComplete='off' onChange={e => handleFormCurstomer(e)} />
                        </div>
                        <div className='btn-container'>
                            <button className='btn-danger' onClick={() => setModalCustomer(false)}>CERRAR</button>
                            <button className='btn-success' onClick={() => addCustomer()}>AGREGAR</button>
                        </div>
                    </div>
                </ModalCustomer>
            }
        </Fragment>
    );
}
 
export default Customers;