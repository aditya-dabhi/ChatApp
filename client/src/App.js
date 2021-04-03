import './App.css';
import Body from './components/Body/Body';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      {/*<Navbar className="App__Navbar" />
        <Body className="App__Body" />
        <Register />*/}
        <Login />
    </div>
  );
}

export default App;
