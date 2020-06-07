import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
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
                { sessionStorage.getItem('userID') ? 
                <header className="signedIn-header">
                    <div></div>
                    <div className="logo-and-menu">
                        <h1>Project Manager</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>

                    </div>
               
                    <button onClick={this.props.logout}><strong>Sign Out</strong></button> 
                </header> :
                <header className="signedOut-header">
                    <h1>Project Manager</h1>
                </header> }

                
            </div>
        )
    }
}

export default Header;