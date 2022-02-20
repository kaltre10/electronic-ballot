import {useState, useEffect, useContext} from 'react';
import postApi from '../../utils/postApi';
import { MonedaContext } from '../../context/contextMoneda';
import { CustomersContext } from '../../context/contexCustomers';
import './form.css';

const Form = ({setResult, result, openModal}) => {

    const { money } = useContext(MonedaContext);
    const { setSearch, setSearchCustomers, handleSearch, searchCustomers, setResultSearch, resultSearch, inputCustomers, setInputCustomers } = useContext(CustomersContext);

    const monedas = [ ...money ];

    // {id: 1, name: "PEN", buy: 1, sell: 1, main: true},
    //     {id: 2, name: "USD", buy: 3.85, sell: 3.9, main: false},
    //     {id: 3, name: "CLP", buy: 3.85, sell: 3.9, main: false},
    //     {id: 4, name: "COP", buy: 3.85, sell: 3.9, main: false},
    //     {id: 5, name: "EUR", buy: 4.4, sell: 4.5, main: false}

    const [ form , setForm] = useState({
        selectDoc: 1,
        numDoc: "",
        customer: "",
        tipo: "COMPRA",
        moneda: "USD",
        cantidad: 0,
        cotizacion: monedas[0].buy,
        monedaR: "PEN",
        cotizacionR: monedas[1].sell,
        recibe: 0,
    });

    let doc;

    useEffect(() => {
        (() => {
            if( form.customer != '' && 
                inputCustomers.name == '' && 
                inputCustomers.num == '' &&
                searchCustomers == ''
            ) {
                setSearch(true);
            }

            setSearchCustomers(form.customer);
            
            handleSearch();
    
            if(form.customer == '') {
                setResultSearch([]);
                setSearch(false);
            }
            calculate();

            if(form.numDoc === '' && inputCustomers.name != '' ){
                console.log(inputCustomers.name)
                //ajustamos los input del cliente
                if(inputCustomers.doc == 'DNI') doc = 1;
                if(inputCustomers.doc == 'PASS') doc = 7;
                if(inputCustomers.doc == 'CE') doc = 4;
                if(inputCustomers.doc == 'RUC') doc = 6;

                setForm({   
                    ...form, 
                    customer: inputCustomers.name,
                    numDoc: inputCustomers.num,
                    selectDoc: doc
                });

                
            }

        })();      
    }, [form, inputCustomers]);


    const handleInput = e => {

        setInputCustomers({name: '', doc: '', num: ''});

        setForm({   
            ...form, 
            [e.target.name]: e.target.value,
            numDoc: ''
        });

        if(e.target.name === 'customer') return;
        
        if(e.target.name === 'moneda' || e.target.name === 'monedaR'){
            
            //modificamos el tipo de cambio
            let cotizacion;
            if(e.target.name === 'moneda'){
                cotizacion = monedas.filter(m => m.name == e.target.value)[0];
            }else{
                cotizacion = monedas.filter(m => m.name == form.moneda)[0];
            }
            

            let monedaRecibe;

            if(e.target.name === 'monedaR'){
                monedaRecibe = monedas.filter(m => m.name === e.target.value)[0];
            }else{
                monedaRecibe = monedas.filter(m => m.name === form.monedaR)[0];
            }
           

            if(form.tipo === "COMPRA"){
                setForm({
                    ...form, 
                    cotizacion: parseFloat((cotizacion.buy / monedaRecibe.sell).toFixed(2)),
                    [e.target.name]: e.target.value,
                    cotizacionR: monedaRecibe.sell,
                    recibe: result   
                })
            }else{
                setForm({
                    ...form, 
                    cotizacion: parseFloat((cotizacion.sell / monedaRecibe.buy).toFixed(2)),
                    [e.target.name]: e.target.value,
                    cotizacionR: monedaRecibe.buy,
                    recibe: result
                })
            }
        }
        
    }

    const handleTipo = (e) => {

        let cotizacion = monedas.filter(m => m.name == form.moneda)[0];
        let monedaRecibe  = monedas.filter(m => m.name === form.monedaR)[0];
        
        
        if(e.target.value === "COMPRA"){
           
            setForm({
                ...form, 
                cotizacion: parseFloat((cotizacion.buy / monedaRecibe.sell).toFixed(2)), 
                [e.target.name]: e.target.value,
                recibe: result
            })
        }else{
           
            setForm({
                ...form, 
                cotizacion: parseFloat((cotizacion.sell / monedaRecibe.buy).toFixed(2)),
                [e.target.name]: e.target.value,
                recibe: result
            })
        }
    }

    const calculate = () => {
        setResult(parseFloat((form.cantidad * form.cotizacion).toFixed(2)));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        //ajustamos los input del cliente
        if(inputCustomers.doc == 'DNI') doc = 1;
        if(inputCustomers.doc == 'PASS') doc = 7;
        if(inputCustomers.doc == 'CE') doc = 4;
        if(inputCustomers.doc == 'RUC') doc = 6;

        setForm({   
            ...form, 
            customer: inputCustomers.name,
            numDoc: inputCustomers.num,
            selectDoc: doc
        });

        openModal(false);

        const query = await postApi({...form, result});
        const dataAPi = await query.blob();
        openModal(true);
        pdf(dataAPi);
        
        document.querySelector('form').reset();
        setResult(0);

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
    
    const clearFrom = () => {
        document.querySelector('form').reset();
        setForm({
            ...form,
            customer: '',
            numDoc: '',
            selectDoc: 1,
            cantidad: 0,
        });
        setResult(0);
    }

    const validation = () => {

    }

    return ( 
        <div className="form-container">
            <form onSubmit={ e => handleSubmit(e) }>
                <p>Datos del Cliente</p>
                <div className='datos-cliente'> 
                    <label className='label-tipo-doc'>Tipo de Documento</label>
                    <select disabled name="selectDoc" className='tipo-doc' onChange={ e => handleInput(e)}>
                        <option selected value={1}>DNI</option>
                        <option selected value={6}>RUC</option>
                        <option value={7}>PASS</option>
                        <option value={4}>CE</option>
                    </select>
                    <input name="numDoc" onChange={ e => handleInput(e)} className='n_doc' type='number' placeholder="Número de Documento" id="" />
                    <input name="customer" onChange={ e => handleInput(e)} className='nombre_cliente' placeholder="Nombre del Cliente" id="" autoComplete='off' required/>
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
                    <input name="cantidad" onChange={ e => handleInput(e)} className='cantidad' type='number' placeholder="Cantidad" id="" required/>

                    <label className="label-cotizacion">Tipo de Cambio</label>
                    <input name='cotizacion' onChange={ e => handleInput(e)} value={form.cotizacion} className='cotizacion' type='number' step="0.01" min="0" value={form.cotizacion} required/>

                    <label className='label-moneda-recibe'>Moneda</label>
                    <select name='monedaR' onChange={ e => handleInput(e)} className='tipo-moneda-recibe'>
                        {monedas
                            .filter(m => m.name !== form.moneda)
                            .map( m => (
                            <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                    </select>

                    <label className="label-recibe">Recibe</label>
                    <input name='recibe' className='recibe' type='number' value={result} required/>
                    <div className='btn-container'>
                        <button type='button' onClick={() => clearFrom()} className='btn btn-limpiar'>LIMPIAR</button>
                        <button type='submit' className='btn btn-registrar'>REGISTRAR</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Form;