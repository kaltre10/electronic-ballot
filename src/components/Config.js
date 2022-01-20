import { Link } from "react-router-dom";
import config from '../images/config.png';
import home from '../images/home.png';

const Config = () => {
    return ( 
        <div className="App">
            <div className="header">
                <div className='ico-config'>
                    <Link to='/'><img src={home} /></Link>
                    <Link to='/config'><img src={config} /></Link>
                </div>
                <h1>Configuración</h1>
            </div>
            <div className="container">
                
            </div>
        </div>
     );
}
 
export default Config;