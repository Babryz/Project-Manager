import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './components/login/logIn';
import SignUp from './components/sign-up/signUp';
import Header from './components/header/header';
import Home from './components/home/home';
import Contact from './components/contact/contact';
import MyProfile from './components/myProfile/myProfile';
import EditProfile from './components/editProfile/editProfile';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: sessionStorage.getItem('userID') ? true : false,
      user: {},
      userID:''
    }
  }

  getUser = async () => {
    const userID = await sessionStorage.getItem('userID')
    const apiCall = await fetch(`http://localhost:8000/users/${userID}`)
    const data = await apiCall.json()
    if (apiCall.status === 200) {
      this.setState({
        ...this.state,
        user: data,
        userID: sessionStorage.getItem('userID')
      })
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
    window.location.replace('http://localhost:3000')
  }

  componentDidMount() {
    if (sessionStorage.getItem('userID')) {
      this.getUser();
    }
  }

  componentDidUpdate() {
    if (sessionStorage.getItem('userID')) {
      this.getUser();
    }
  }

  render() {
    const { loggedIn, user } = this.state;
    
      return (
        <Router>
          <div>
            <Header user={user}
                    logout={this.logout} />
            { loggedIn ? 
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contact" component={Contact} />
                <Route path="/myProfile" render={() => <MyProfile user={user} />} />
                <Route path="/editProfile" render={() => <EditProfile user={user} />} />
              </Switch>
            </div>

            
             : <div>
              <Switch>
                <Route path="/" exact render={() => <Login checkLogin={this.checkLogin} />} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </div>
             }
          </div>
        </Router>
      )
  }
}

export default App;
