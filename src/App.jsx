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
      user: {

      }
    }
  }

  getUser = async () => {
    if (this.state.loggedIn && sessionStorage.getItem('userID')) {
      const userID = await sessionStorage.getItem('userID')
      const apiCall = await fetch(`http://localhost:8000/users/${userID}`)
      const data = await apiCall.json()
      if (apiCall.status === 200) {
        this.setState({
          ...this.state,
          user: data
        })
      }
    }
  }

  checkLogin = () => {
    this.setState({
      ...this.state,
      loggedIn: true
    })
  } 

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate() {
    this.getUser();
  }

  render() {
    const { screenWidth, loggedIn, user } = this.state;
    
      return (
        <Router>
          <div>
            <Header />
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
