import { Fragment } from 'react';
import './modalConfirm.css';

const ModalConfirm  = ({title, setModal, data, fun}) => {
    return ( 
        <Fragment>
            <div className="modal-container">
                <h2>{title}</h2>
                <div className='btn-container'>
                    <button className='btn-danger' onClick={() => setModal(false)}>No, Cancelar</button>
                    <button className='btn-success' onClick={() => fun(data)}>Si</button>
                </div>   
            </div>
        </Fragment>
     );
}
 
export default ModalConfirm;