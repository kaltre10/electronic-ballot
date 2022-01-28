import modalMoney from './modalMoney.css';

const ModalMoney = ({children}) => {
    return ( 
        <div className="modal">
            {children}
        </div>
     );
}

export default ModalMoney;