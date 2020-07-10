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
    }

    handleClick = () => {
        document.getElementById('dropdown-menu').classList.toggle('show');
        document.getElementById('drop-arrow').classList.toggle('rotate');
    }

    render() {
        const { user } = this.props;

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
                        <p>{user.firstName}</p>
                        <div className="dropdown">
                            <div className="drop-btn" onClick={this.handleClick}>
                                <img src={UserLogo} alt="" id="user-logo"/>
                                <img src={DropLogo} alt="" id="drop-arrow"/>
                            </div>
                            <nav id="dropdown-menu" className="dropdown-content">
                                <ul>
                                    <li><Link to="myProfile">My Profile</Link></li>
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