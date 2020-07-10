import React from 'react';
import { Link } from 'react-router-dom';
import './signUp.css';

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    apiCall = 'http://localhost:8000/register';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    register = async () => {
        const apiCall = await 
            fetch(this.apiCall, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            const data = await apiCall.json();
            if (apiCall.status === 200) {
                window.location.replace('http://localhost:3000/');
            } else {
                this.setState({
                    ...this.state,
                    error: true,
                    errorMessage: data.message
                })
            }
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        this.register(event)
            .catch(err => {sessionStorage.setItem('funcErr', err)})
    }

    render() {
        const { error, errorMessage } = this.state;

        return (
            <div className="signUp">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input  type="text" 
                            value={this.state.firstName} 
                            name="firstName"
                            className="text-input" 
                            onChange={this.handleChange} 
                            required/>

                    <label htmlFor="lastName">Last Name:</label>
                    <input  type="text" 
                            value={this.state.lastName} 
                            name="lastName" 
                            className="text-input"
                            onChange={this.handleChange} 
                            required/>

                    <label htmlFor="email">E-mail:</label>
                    <input  type="text" 
                            value={this.state.email} 
                            name="email" 
                            className="text-input"
                            onChange={this.handleChange} 
                            required/>

                    <label htmlFor="password">Password:</label>
                    <input  type="password" 
                            value={this.state.password} 
                            name="password"
                            className="text-input" 
                            onChange={this.handleChange} 
                            required/>
                    <input type="submit" value="Sign Up" className="landing-btn"/>
                </form>
                {error ? <p><strong>{errorMessage}</strong></p> : false}
                <p>Already have an account? Log in <Link to="/">here!</Link></p>
            </div>
        )
    }
}

export default SignUp;