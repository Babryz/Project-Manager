import React from 'react';
import './editProfile.css';

import UserLogo from '../../pictures/user.png';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            alias: this.props.user.alias,
            email: this.props.user.email || null,
            error: false,
            errorMessage: ''
        }
    }

    apiCall = 'http://localhost:8000/editUser';

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    editUser = async () => {
        const apiCall = await fetch(this.apiCall, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.user.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                alias: this.state.alias
            })
        })
        const data = await apiCall.json();
        if (apiCall.status === 200) {
            window.location.replace('/myProfile')
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
        this.editUser()
            .catch((err) => {sessionStorage.setItem('funcErr', err)})
    }

    render() {
        const { firstName, 
                lastName, 
                alias, 
                error, 
                errorMessage } = this.state;

        return (
            <div className="container" id="edit-profile">
                <form action="" onSubmit={this.handleSubmit} >
                    <div className="user-info">
                        <img src={UserLogo} alt=""/>
                        <label htmlFor="email">Email: </label>
                        <input type="text" value={this.props.user.email || ''} id="email" name="email" readOnly disabled/>
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" value={firstName !== undefined ? firstName : this.props.user.firstName || ''} id="firstName" name="firstName" onChange={this.handleChange} />
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" value={lastName !== undefined ? lastName : this.props.user.lastName || ''} id="lastName" name="lastName" onChange={this.handleChange} />
                        <label htmlFor="alias">Alias</label>
                        <input type="text" value={alias !== undefined ? alias : this.props.user.alias || ''} id="alias" name="alias" onChange={this.handleChange} />
                    </div>
                    <input type="submit" value="Update"/>
                </form>
                { error ? <p>{errorMessage}</p> : <div></div>}
            </div>
        )
    }
}

export default EditProfile;