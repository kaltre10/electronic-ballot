import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Config from './components/Config';
import { MonedaProvider } from './context/contextMoneda';
import { CustomersProvider } from './context/contexCustomers';

function App() {
  return (
    <MonedaProvider>
      <CustomersProvider>
        <Routes>
          <Route path="/electronic-ballot" element={<Home />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </CustomersProvider>
    </MonedaProvider>
  );
}

export default App;
