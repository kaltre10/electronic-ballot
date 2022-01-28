import './modalCustomer.css';

const ModalCustomer = ({children}) => {
    return ( 
        <div className="modal">
            {children}
        </div>
     );
}

export default ModalCustomer;