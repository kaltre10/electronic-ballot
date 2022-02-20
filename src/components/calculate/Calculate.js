import './calculate.css';

const Calculate = ({result}) => {
    return ( 
        <div className="calculate-container">
            <p className="title-calculate">Total <span className='sub-title-calculate'>(Dolares)</span></p>
            <p className="resultado-calculate"><span>$</span> {result}</p>
            <div className="barra"></div>
        </div>
     );
}

export default Calculate;