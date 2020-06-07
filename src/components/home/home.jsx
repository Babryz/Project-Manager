import React from 'react';
import './home.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
           <main>
               <nav className="sidebar">
                    <h3>Projects:</h3>
                    <div className="started">
                        <h4>Started:</h4>
                        <hr/>
                        <ul >
                            <li>Started Project 1</li>
                            <li>Started Project 2</li>
                            <li>Started project 3</li>
                        </ul>
                    </div>
                    <div className="joined">
                        <h4>Joined:</h4>
                        <hr/>
                        <ul >
                            <li>Joined Project 1</li>
                            <li>Joined Project 2</li>
                            <li>Joined Project 3</li>
                        </ul>
                    </div>
               </nav>
           </main>
        )
    }
}

export default Home;