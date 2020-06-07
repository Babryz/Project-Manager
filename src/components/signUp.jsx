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
        }
    }

    apiCall = 'http://localhost:8000/register';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = async (event) => {
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
    }

    render() {
        return (
            <div className="signUp">
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit} action="/">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} required/>

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} required/>

                    <label htmlFor="email">E-mail:</label>
                    <input type="text" value={this.state.email} name="email" onChange={this.handleChange} required/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" value={this.state.password} name="password" onChange={this.handleChange} required/>
                    <input type="submit" value="Sign Up" className="landing-btn"/>
                </form>
                <p>Already have an account? Log in <Link to="/">here!</Link></p>
            </div>
        )
    }
}

export default SignUp;