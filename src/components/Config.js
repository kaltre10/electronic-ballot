import { Fragment } from "react";
import { Link } from "react-router-dom";
import config from '../images/config.png';
import home from '../images/home.png';
import Money from './money/Money';
import Customers from './customers/Customers';

const Config = () => {

    return ( 
        <Fragment>
            <div className="App">
                <div className="header">
                    <div className='ico-config'>
                        <Link to='/'><img src={home} /></Link>
                        <Link to='/config'><img src={config} /></Link>
                    </div>
                    <h1>Configuración</h1>
                </div>
                <div className="container-config">
                    <Money/>
                    <Customers />
                </div>
            </div>
        </Fragment>
     );
}
 
export default Config;