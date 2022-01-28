import { useState, Fragment } from 'react';
import Modal from '../../modal';
import ModalConfirm from '../modalConfirm/ModalConfirm';
import ModalMoney from '../modalMoney/ModalMoney';
import { v4 as uuidv4 } from 'uuid';
import './money.css';

const Money = () => {

    const [ money, setMoney ] = useState([
        {id: 1, name: "PEN", buy: 0, sell: 0, main: true},
        {id: 2, name: "USD", buy: 3.85, sell: 3.9, main: false},
        {id: 3, name: "CLP", buy: 3.85, sell: 3.9, main: false},
        {id: 4, name: "COP", buy: 3.85, sell: 3.9, main: false},
        {id: 5, name: "EUR", buy: 4.4, sell: 4.5, main: false}
    ]);

    const [ data , setData ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ modalMain, setModalMain ] = useState(false);
    const [ modalUpdate, setModalUpdate ] = useState(false);
    const [ modalMoney, setModalMoney ] = useState(false);
    const [ formError, setFormError ] = useState(false);
    const [ form, setForm ] = useState({
        name: '',
        buy: 0,
        sell: 0
    })

    const handleBtn = (id) => {
        setModal(true);
        setData(id)
    }

    const deleteMoney = (id) => {
        const newMoney = money.filter( m => m.id !== id);
        setMoney(newMoney);
        setModal(false);
    }

    const handleMain = (id) => {
        setModalMain(true);
        setData(id);
    }

    const mainMoney = (id) => {
        const newMoney = money.map( m => {
            if(m.id === id){
                m.main = true;
                m.sell = 0;
                m.buy = 0;
            }else{
                m.main = false;
            }
            return m;
        })
        setMoney(newMoney);
        setModalMain(false);
    }

    const handleUpdate = (id, {buy, sell}) => {
        setModalUpdate(true);
        setData({id, buy, sell});
    }

    const updateMoney = ({id, buy, sell}) => {
        const newMoney = money.map( m => {
            if(m.id === id){
                m.sell = Number(sell);
                m.buy = Number(buy);
            }
            return m;
        })
        setMoney(newMoney);
        setModalUpdate(false);
        setForm({buy: 0, sell: 0});
    };

    const handleFrom = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleFormMoney = (e) => {
        setFormError(false);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const addMoney = () => {
        const { name, sell, buy } = form;
        form.main = false;
        form.id = uuidv4();
        if(name == '' || sell == '' || buy == ''){
            setFormError(true);
            return;
        }
        setMoney([ ...money,  form]);
        setModalMoney(false);
        setForm({ name: '', sell: 0, buy: 0 });
    }

    return ( 
        <Fragment>
        <div className="money">
            <div style={{display: "flex", justifyContent: "center", padding:"20px 0", gap: "10px"}}>
                <h2>Monedas</h2>
                <button className='btn btn-registrar' onClick={ () => setModalMoney(true) }>AGREGAR</button>
            </div>
            
                {money.map( money => (
                    <div key={money.id} className='input-money'>
                        <p>{money.name}</p>  
                        COMPRA:<input name='buy' placeholder={money.buy}  onChange={e => handleFrom(e)} />
                        VENTA:<input name='sell' placeholder={money.sell}  onChange={e => handleFrom(e)} />
                        <label>Principal</label>
                        <input type="checkbox" checked={money.main}  onClick={ () => handleMain(money.id) } />
                        {!money.main && <span className='delete-money' onClick={ () => handleBtn(money.id) }> ❌ </span>} 
                        {!money.main && <span className='update-money' onClick={ () => handleUpdate(money.id, form) }> ✔️ </span>} 
                    </div>
                ))} 
        </div>
        {
            modal &&
                <Modal>
                    <ModalConfirm 
                        title = 'Desea eliminar esta Moneda?'
                        setModal = {setModal}
                        data = {data}
                        fun = {deleteMoney}
                    />
                </Modal>
        }
        {
            modalMain &&
                <Modal>
                    <ModalConfirm 
                        title = 'Desea asignar como Principal?'
                        setModal = {setModalMain}
                        data = {data}
                        fun = {mainMoney}
                    />
                </Modal>
        }
        {
            modalUpdate &&
                <Modal>
                    <ModalConfirm 
                        title = 'Desea Actualizar esta Moneda?'
                        setModal = {setModalUpdate}
                        data = {data}
                        fun = {updateMoney}
                    />
                </Modal>
        }
        {
            modalMoney &&
                <ModalMoney>
                    <div className='modal-container'>
                        <h2>AGREGAR MONEDA:</h2>
                        <div className="select">
                            <input name='name' className={formError && "input-error"} placeholder='Nombre' onChange={e => handleFormMoney(e)} autoComplete='off' />
                            <input type='number' any='0.00' className={formError && "input-error"} name='buy' placeholder='COMPRA'  any='0.00' onChange={e => handleFormMoney(e)} />
                            <input type='number' className={formError && "input-error"} name='sell' placeholder='VENTA' onChange={e => handleFormMoney(e)} />
                        </div>
                        <div className='btn-container'>
                            <button className='btn-danger' onClick={() => setModalMoney(false)}>CERRAR</button>
                            <button className='btn-success' onClick={() => addMoney()}>AGREGAR</button>
                        </div>
                    </div>
                </ModalMoney>
        }
        </Fragment>
     );
}
 
export default Money;