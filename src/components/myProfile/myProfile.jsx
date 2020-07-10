import React from 'react';
import './myProfile.css';

import UserLogo from '../../pictures/user.png';

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        console.log(user);

        return (
            <div className="container" id="my-profile">
                <div className="user-info">
                    <img src={UserLogo} alt=""/>
                    <h3>{user.firstName} "[Alias]" {user.lastName}</h3>
                    <p>{user.email}</p>
                    <p>English, Swedish</p>
                </div>
                <div className="other-info">
                    <div id="skills-info">
                        <h3>Skills</h3>
                        <ul>
                            <li>Skill 1</li>
                            <li>Skill 2</li>
                            <li>Skill 3</li>
                            <li>Skill 4</li>
                            <li>Skill 5</li>
                            <li>Skill 6</li>
                            <li>Skill 7</li>
                        </ul>
                    </div>
                    <div id="projects-info">
                        <h3>Projects</h3>
                        <h4>Created:</h4>
                        <ul>
                            <li>Project 1</li>
                            <li>Project 2</li>
                            <li>Project 3</li>
                            <li>Project 4</li>
                            <li>Project 5</li>
                        </ul>
                        <h4>Joined:</h4>
                        <ul>
                            <li>Project 1</li>
                            <li>Project 2</li>
                            <li>Project 3</li>
                            <li>Project 4</li>
                            <li>Project 5</li>
                        </ul>
                    </div>
                    <div id="contacts-info">
                        <h3>Contacts</h3>
                            <ul>
                                <li>Contact 1</li>
                                <li>Contact 2</li>
                                <li>Contact 3</li>
                                <li>Contact 4</li>
                                <li>Contact 5</li>
                                <li>Contact 6</li>
                                <li>Contact 7</li>
                            </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyProfile;