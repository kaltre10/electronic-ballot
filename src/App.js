import './App.css';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <div className="header">
        <Menu />
        <h1>Boleta Electrónica</h1>
      </div>
      <div className="container">
        <div className="ticket">
          <form>

          </form>
        </div>
        <div className="calculate"></div>
      </div>
    </div>
  );
}

export default App;
