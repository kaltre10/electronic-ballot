import './calculate.css';

const Calculate = () => {
    return ( 
        <div className="calculate-container">
            <p className="title-calculate">Total <span className='sub-title-calculate'>(Dolares)</span></p>
            <p className="resultado-calculate"><span>$</span> 1250</p>
            <div className="barra"></div>
        </div>
     );
}
 
export default Calculate;