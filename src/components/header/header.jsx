import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends React.Component {
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

    componentDidMount() {
        if (sessionStorage.getItem('userID')) {
            this.getUser();
        }
    }

    render() {
        const { loggedIn, user } = this.state;

        return (
            <div>
                <header>
                    <h1>Project Manager</h1>
                    { sessionStorage.getItem('userID') ?  <nav>
                        <Link to="/">Home</Link>
                        <Link to="/contact">Contact</Link>
                    </nav> :
                    false }
                    
                </header>
            </div>
        )
    }
}

export default Header;