import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './components/login/logIn';
import SignUp from './components/sign-up/signUp';
import Header from './components/header/header';
import Home from './components/home/home';
import Contact from './components/contact/contact';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem('userID') ? true : false,
    }
  }

  checkLogin = () => {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  }

  logout = () => {
    sessionStorage.clear();
    this.setState({
      ...this.state,
      loggedIn: false
    })
  }

  render() {
    const {loggedIn } = this.state;
    
      return (
        <Router>
          <div>
            <Header logout={this.logout} />
            { loggedIn ? 
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </div>

            
             : <div>
              <Switch>
                <Route path="/" exact render={() => <Login checkLogin={this.checkLogin} />} />
                <Route path="/sign-up" component={SignUp} />
              </Switch>
            </div>
             }
          </div>
        </Router>
      )
  }
}

export default App;
