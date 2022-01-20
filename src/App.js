import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Config from './components/Config';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/config" element={<Config />} />
    </Routes>
  );
}

export default App;
