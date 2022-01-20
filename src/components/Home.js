import Form from './form/Form';
import Calculate from './calculate/Calculate';
import home from '../images/home.png';
import config from '../images/config.png';
import { Link } from "react-router-dom";

const Home = () => {
    return ( 
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
                    <Form />
                </div>
                <div className="calculate">
                    <Calculate/>
                </div>
            </div>
        </div>
     );
}

export default Home;