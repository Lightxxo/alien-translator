import './App.css';
import AppBody from './components/AppBody';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBody />
      </div>
    </BrowserRouter>
  );
}

export default App;
