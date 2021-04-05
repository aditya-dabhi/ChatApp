import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Main from './components/Main/Main'

function App() {
  return(
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;