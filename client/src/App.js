import './App.css';
import Body from './components/Body/Body';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar className="App__Navbar" />
        <Body className="App__Body" />
    </div>
  );
}

export default App;
