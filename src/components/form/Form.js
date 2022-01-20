import {useState} from 'react';
import './form.css';

const Form = () => {

    const [select, setselect] = useState("DNI");

    const handleSelect = e => {
        setselect(e.target.value);
    }

    return ( 
        <div className="form-container">
            <form>
                <p>Datos del Cliente</p>
                <div className='datos-cliente'> 
                    <label className='label-tipo-doc'>Tipo de Documento</label>
                    <select className='tipo-doc'>
                        <option selected value="DNI">DNI</option>
                        <option value="PASS">PASS</option>
                        <option value="CE">CE</option>
                    </select>
                    <input className='n_doc' type='number' placeholder="Número de Documento" id="" />
                    <input className='nombre_cliente' placeholder="Nombre del Cliente" id="" />
                </div>
                <p>Datos de la operacion</p>
                <div className='datos-operacion'>
                    <label className='label-tipo-operacion'>Tipo operacion</label>
                    <select className='tipo-operacion'>
                        <option selected value="COMPRA">COMPRA</option>
                        <option value="VENTA">VENTA</option>
                    </select>
                    <label className='label-moneda'>Moneda</label>
                    <select className='tipo-moneda'>
                        <option selected value="DOLAR">DOLAR</option>
                        <option value="SOL">SOL</option>
                    </select>
                    <label className="label-cantidad">Cantidad</label>
                    <input className='cantidad' type='number' placeholder="Cantidad" id="" />
                    <label className="label-cotizacion">Tipo de Cambio</label>
                    <input className='cotizacion' type='number' placeholder="3.96" id="" />
                    <label className='label-moneda-recibe'>Moneda</label>
                    <select className='tipo-moneda-recibe'>
                        <option selected value="DOLAR">DOLAR</option>
                        <option value="SOL">SOL</option>
                    </select>
                    <label className="label-recibe">Recibe</label>
                    <input className='recibe' type='number' placeholder="0.00" id="" />
                    <div className='btn-container'>
                        <button className='btn btn-limpiar'>LIMPIAR</button>
                        <button className='btn btn-registrar'>REGISTRAR</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Form;