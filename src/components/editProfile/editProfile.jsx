import React from 'react';
import './editProfile.css';

import UserLogo from '../../pictures/user.png';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;

        return (
            <div className="container" id="edit-profile">
                <form action="">
                    <div className="user-info">
                        <img src={UserLogo} alt=""/>
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" value={user.firstName} id="firstName" name="firstName"/>
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" value={user.lastName} id="lastName" name="lastName"/>
                        <label htmlFor="alias">Alias</label>
                        <input type="text" value={user.alias ? user.alias : ''} id="alias" name="alias"/>
                        <label htmlFor="email">Email: </label>
                        <input type="text" value={user.email} id="email" name="email" readOnly disabled/>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile;