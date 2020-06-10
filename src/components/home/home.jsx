import React from 'react';
import './home.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            projects: {

            },
            isLoaded: false,
            error: false,
            errorMessage: ''
        }
    }

    getStartedProjects = async () => {
        const userID = await sessionStorage.getItem('userID');
        const apiCall = await fetch(`http://localhost:8000/projects/${userID}`)
        const data = await apiCall.json();
        
        if (apiCall.status === 200) {
            this.setState({
                ...this.state,
                projects: data,
                isLoaded: true
            })
        } else {
            this.setState({
                ...this.state,
                error: true,
                errorMessage: data.message,
                isLoaded: true
            })
        }
        
    }

    getLatestProjects = async () => {

    }

    componentDidMount() {
        this.getStartedProjects();
    }

    render() {
        const { projects, isLoaded, error, errorMessage } = this.state;

        if (!isLoaded) {
            return (
                <p>Loading...</p>
            )
        } else {
            console.log(projects);
            return (
                <div className="home-container">
                    <aside>
                        <nav className="sidebar">
                             <h3>Projects:</h3>
                             <div className="started">
                                 <h4>Started:</h4>
                                 <hr/>
                                { error ? <p>{errorMessage}</p> : 
                                <ul>{projects.map((project) => (
                                    <li>{project.title.length < 18 ? project.title : project.title.slice(0, 17) + '...'}</li>
                                ))}</ul> }
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
                    </aside>
                    <main>
                        <div className="head">
                            <p><strong>Browse Projects</strong></p>
                            <div className="filter-container">
                                <div className="btn-container">
                                    <button className={'btn' + ' disabled'} id="popular-btn"><strong>Popular</strong></button>
                                    <button className="btn" id="latest-btn"><strong>Latest</strong></button>
                                </div>
                                <form action="" className="search">
                                    <input type="text" placeholder="Searchterm" className="search-input"/>
                                    <input type="submit" value="Search" className="search-submit"/>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
             )
        }

        
    }
}

export default Home;