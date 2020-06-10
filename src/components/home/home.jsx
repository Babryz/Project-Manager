import React from 'react';
import { Link } from 'react-router-dom'
import './home.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            startedProjects: [],
            isLoaded: false,
            error: false,
            errorMessage: '',
            category: 'latest'
        }
    }

    getAllProjects = async () => {
        const apiCall = await fetch('http://localhost:8000/projects');
        const data = await apiCall.json();

        if (apiCall.status === 200) {
            this.setState({
                ...this.state,
                projects: data,
                isLoaded: true
            })
        } 
    }

    getStartedProjects = async () => {
        const userID = await sessionStorage.getItem('userID');
        const apiCall = await fetch(`http://localhost:8000/projects/${userID}`);
        const data = await apiCall.json();
        
        if (apiCall.status === 200) {
            this.setState({
                ...this.state,
                startedProjects: data,
            })
        } else {
            this.setState({
                ...this.state,
                error: true,
                errorMessage: data.message,
            })
        }
        
    }

    handleClick = (e) => {
        this.setState({
            ...this.state,
            category: e.target.value
        })
    }

    componentDidMount() {
        this.getAllProjects();
        this.getStartedProjects();
    }

    render() {
        const { projects, startedProjects, isLoaded, error, errorMessage, category } = this.state;

        let popularClass = 'btn disabled';
        let latestClass = 'btn';

        if (category !== 'popular') {
            popularClass = 'btn disabled';
        } else {
            popularClass = 'btn'
        }

        if (category !== 'latest') {
            latestClass = 'btn disabled';
        } else {
            latestClass = 'btn';
        }

        if (!isLoaded) {
            return (
                <p>Loading...</p>
            )
        } else {
            console.log(projects);
            console.log(startedProjects);
            return (
                <div className="home-container">
                    <aside>
                        <nav className="sidebar">
                             <h3>Projects:</h3>
                             <div className="started">
                                 <h4>Started:</h4>
                                 <hr/>
                                { error ? <p>{errorMessage}</p> : 
                                <ul>{startedProjects.map((project, i) => (
                                    <li key={i} ><Link to={`project/${project._id}`}>{project.title.length < 18 ? project.title : project.title.slice(0, 17) + '...'}</Link></li>
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
                            <h2>Browse Projects</h2>
                            <div className="filter-container">
                                <div className="btn-container">
                                    <button onClick={this.handleClick} className={popularClass} id="popular-btn" value="popular">Popular</button>
                                    <button onClick={this.handleClick} className={latestClass} id="latest-btn" value="latest" >Latest</button>
                                </div>
                                <form action="" className="search">
                                    <input type="text" placeholder="Searchterm" className="search-input"/>
                                    <input type="submit" value="Search" className="search-submit"/>
                                </form>
                            </div>
                        </div>
                        <div className="browse">
                            { projects.map((project, i) => (
                                <div className="project" key={i}>
                                    <h3><Link to={`project/${project._id}`}>{project.title}</Link></h3>
                                    <div className="img-container">
                                        <img src="https://via.placeholder.com/200" alt="placeholder pic"/>
                                        <img src="https://via.placeholder.com/200" alt="placeholder pic"/>
                                    </div>
                                    {project.description.length < 200 ? <p>{project.description}</p> : <p>{project.description.slice(0, 197) + '...'}</p>}
                                </div>
                            )) }
                        </div>
                    </main>
                </div>
             )
        }

        
    }
}

export default Home;