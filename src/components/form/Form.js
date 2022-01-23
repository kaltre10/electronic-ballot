import {useState, useEffect} from 'react';
import postApi from '../../utils/postApi'
import './form.css';

const Form = ({setResult, result, openModal}) => {

    const monedas = [
        {id: 1, name: "USD", buy: 3.81, sell: 3.88, main: false},
        {id: 2, name: "PEN", buy: 0, sell: 0, main: true},
        {id: 3, name: "CLP", buy: 3.85, sell: 3.9, main: false},
        {id: 4, name: "COP", buy: 3.85, sell: 3.9, main: false},
        {id: 5, name: "EUR", buy: 4.4, sell: 4.5, main: false}
    ]

    const [ form , setForm] = useState({
        selectDoc: 1,
        numDoc: "",
        customer: "",
        tipo: "COMPRA",
        moneda: "USD",
        cantidad: 0,
        cotizacion: monedas[0].buy,
        monedaR: "PEN",
        recibe: 0,
    });

    useEffect(() => {
        calculate();
    }, [form]);


    const handleInput = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleTipo = (e) => {

        let newCotizacion = monedas.filter(m => m.name == form.moneda)[0];

        if(e.target.value === "COMPRA"){
            setForm({
                ...form, 
                cotizacion: newCotizacion.buy, 
                tipo: e.target.value
            })
        }else{
            setForm({
                ...form, 
                cotizacion: newCotizacion.sell, 
                tipo: e.target.value
            })
        }
    }

    const calculate = () => {
        setResult(form.cantidad * form.cotizacion);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        openModal(false);
        const query = await postApi({...form, result});
        const dataAPi = await query.blob();
        openModal(true);
        pdf(dataAPi);
        
    }

    const pdf = (dataAPi) => {
        let objectURL = URL.createObjectURL(dataAPi);
        let link = document.createElement('a');
        document.body.appendChild(link); 
        link.href = objectURL;
        link.download = "Boleta";
        link.click();
        window.URL.revokeObjectURL(objectURL);
        link.remove();
    }   

    return ( 
        <div className="form-container">
            <form onSubmit={ e => handleSubmit(e) }>
                <p>Datos del Cliente</p>
                <div className='datos-cliente'> 
                    <label className='label-tipo-doc'>Tipo de Documento</label>
                    <select name="selectDoc" className='tipo-doc' onChange={ e => handleInput(e)}>
                        <option selected value={1}>DNI</option>
                        <option value={7}>PASS</option>
                        <option value={4}>CE</option>
                    </select>
                    <input name="numDoc" onChange={ e => handleInput(e)} className='n_doc' type='number' placeholder="Número de Documento" id="" />
                    <input name="customer" onChange={ e => handleInput(e)} className='nombre_cliente' placeholder="Nombre del Cliente" id="" autoComplete='off' />
                </div>
                <p>Datos de la operacion</p>
                <div className='datos-operacion'>

                    <label className='label-tipo-operacion'>Tipo operacion</label>
                    <select 
                        name="tipo" 
                        className='tipo-operacion'
                        onChange={ e => handleTipo(e) }
                    >
                        <option selected value="COMPRA">COMPRA</option>
                        <option value="VENTA">VENTA</option>
                    </select>

                    <label className='label-moneda'>Moneda</label>
                    <select name="moneda" onChange={ e => handleInput(e)} className='tipo-moneda'>
                        {monedas
                            .filter(m => m.name !== form.monedaR)
                            .map( m => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                    </select>

                    <label className="label-cantidad">Cantidad</label>
                    <input name="cantidad" onChange={ e => handleInput(e)} className='cantidad' type='number' placeholder="Cantidad" id="" />

                    <label className="label-cotizacion">Tipo de Cambio</label>
                    <input name='cotizacion' onChange={ e => handleInput(e)} value={form.cotizacion} className='cotizacion' type='number' step="0.01" min="0" value={form.cotizacion} />

                    <label className='label-moneda-recibe'>Moneda</label>
                    <select name='monedaR' onChange={ e => handleInput(e)} className='tipo-moneda-recibe'>
                        {monedas
                            .filter(m => m.name !== form.moneda)
                            .map( m => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                    </select>

                    <label className="label-recibe">Recibe</label>
                    <input name='recibe' className='recibe' type='number' value={result}/>
                    <div className='btn-container'>
                        <button type='button' className='btn btn-limpiar'>LIMPIAR</button>
                        <button type='submit' className='btn btn-registrar'>REGISTRAR</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Form;