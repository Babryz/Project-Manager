import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    apiCall = 'http://localhost:8000/login';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    }

    getUser = async () => {
        const apiCall = await 
            fetch(this.apiCall, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
        const data = await apiCall.json()
        if (apiCall.status === 200) {
            sessionStorage.clear();
            sessionStorage.setItem('userID', data)
            this.props.checkLogin()
        } else {
            sessionStorage.clear();
            this.setState({
                ...this.state,
                error: true,
                errorMessage: data.message
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getUser().catch(err => (sessionStorage.setItem('funcErr', err)))
    }

    render() {
        const { email, 
                password, 
                error, 
                errorMessage } = this.state;

            return (
                <div className="login">
                    <h2>Sign In</h2>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <label htmlFor="email">E-mail: </label>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={this.handleChange} 
                            name="email" 
                            id="email"
                            className="text-input"
                            required/>
    
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={this.handleChange} 
                            name="password" 
                            id="password" 
                            className="text-input"
                            required/>
    
                        <input type="submit" value="Sign In" className="landing-btn"/>
                    </form>
    
                    <p>No account yet? Register a new one <Link to="/sign-up">here!</Link></p>
                    { error ?  
                    <div className="error">
                        <h3>{errorMessage}</h3>
                    </div> 
                    : <div></div> }
                    
                </div>
            )

    }
}

export default LogIn;