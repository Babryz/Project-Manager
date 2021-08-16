import React from 'react';
import { Link } from 'react-router-dom';
import UserLogo from '../../pictures/user.png';
import DropLogo from '../../pictures/dropdown.png';

import './header.css';

window.onclick = function(e) {
    if (!e.target.matches('.drop-btn') && !e.target.matches('.dropdown-content')) {
       let dropdown = document.getElementById('dropdown-menu');
       let arrow = document.getElementById('drop-arrow');
        if (!dropdown) {
            return;
        } else if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            arrow.classList.remove('rotate');
        }
    }
}

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

    handleClick = () => {
        document.getElementById('dropdown-menu').classList.toggle('show');
        document.getElementById('drop-arrow').classList.toggle('rotate');
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                { sessionStorage.getItem('userID') ? 
                <header className="signedIn-header">
                    <div className="spacing"></div>
                    <div className="logo-and-menu">
                        <h1>Project Manager</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>

                    </div>
                    <div className="logout-box">
                        <p>{user.firstName}</p>
                        <div className="dropdown">
                            <div className="drop-btn" onClick={this.handleClick}>
                                <img src={UserLogo} alt="" id="user-logo"/>
                                <img src={DropLogo} alt="" id="drop-arrow"/>
                            </div>
                            <nav id="dropdown-menu" className="dropdown-content">
                                <ul>
                                    <li><Link to="myProfile">My Profile</Link></li>
                                    <li>Other</li>
                                    <li onClick={this.props.logout}>Log Out</li>
                                </ul>
                            </nav>
                        </div>
                    </div> 
                </header> :
                <header className="signedOut-header">
                    <h1>Project Manager</h1>
                    <nav>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </header> }

                
            </div>
        )
    }
}

export default Header;
