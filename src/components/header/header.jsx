import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {

            },
            userID: ''
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

    componentDidMount() {
        if (sessionStorage.getItem('userID')) {
            this.getUser();
        }
    }

    componentDidUpdate() {
        if (this.state.userID !== sessionStorage.getItem('userID')) {
            this.getUser();
        }
    }

    

    render() {
        const { user } = this.state;

        return (
            <div>
                { sessionStorage.getItem('userID') ? 
                <header className="signedIn-header">
                    <div id="spacing"></div>
                    <div className="logo-and-menu">
                        <h1>Project Manager</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>

                    </div>
                    <div className="logout-box">
                        <p><strong>{user.email}</strong></p>
                        <button id="sign-out" onClick={this.props.logout}><strong>Sign Out</strong></button>
                    </div> 
                </header> :
                <header className="signedOut-header">
                    <h1>Project Manager</h1>
                </header> }

                
            </div>
        )
    }
}

export default Header;