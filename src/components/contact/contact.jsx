import React from 'react';
import './contact.css';

class Contact extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (sessionStorage.getItem('userID')) {
            return (
                <div className="contact-page">
                    <div className="contact-form">
                        <h2>Contact Us:</h2>
                        <form action="">
                            <label htmlFor="issue-options"><h3>What kind of issue is this?</h3></label>
                            <select name="issue-options" id="issue-options">
                                <option value="">-- Select an option --</option>
                                <option value="bug">Bug</option>
                                <option value="account">Account</option>
                                <option value="project">Project</option>
                                <option value="violation">Terms violation</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="issue-text"><h3>Describe your issue:</h3></label>
                            <textarea name="issue-text" id="issue-text" placeholder="Type here..."></textarea>
                            <label htmlFor="issue-pic"><h3>Example pic:</h3></label>
                            <input type="file" name="issue-pic" id="issue-pic"/>
                            <input type="submit" value="submit" id="issue-submit"/>
                        </form>
                    </div>
                    <div className="contact-container logged-in">
                        <h2>Admin Info:</h2>
                        <div className="contact">
                            <div className="contact-text">
                                <strong>Wondering about something?</strong>
                                <p>First check our FAQ to see if your question has been answered there, 
                                    we've made the FAQ so you won't have to wait for us to get back to you on common questions or issues! <br/>
                                    If you can't find your issue there, then feel free to leave a ticket on it to the left or if
                                    it's complex or urgent you can always contact us with the information below!
                                </p>
                            </div>
                            <hr/>
                            <div className="info logged-in">
                                <div id="juan-info">
                                    <h3>Juan Pablo Orellana:</h3>
                                    <p>Email:</p>
                                    <p>juan.orellana@chasacademy.se</p>
                                </div>
                                <div id="babryz-info">
                                    <h3>Emil Babra:</h3>
                                    <p>Email: </p>
                                    <p>emil.babra@chasacademy.se</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return (
                <div className="contact-container">
                    <h2>Admin Info:</h2>
                    <div className="contact">
                        <div className="contact-text">
                            <strong>Wondering about something?</strong>
                            <p>First check our FAQ to see if your question has been answered there, 
                                we've made the FAQ so you won't have to wait for us to get back to you on common questions or issues! <br/>
                                If you can't find your answer there, then feel free to email us at the adresses below and 
                                we'll get back to you as soon as possible!
                            </p>
                        </div>
                        <hr/>
                        <div className="info">
                            <div id="juan-info">
                                <h3>Juan Pablo Orellana:</h3>
                                <p>Email:</p>
                                <p>juan.orellana@chasacademy.se</p>
                            </div>
                            <div id="babryz-info">
                                <h3>Emil Babra:</h3>
                                <p>Email: </p>
                                <p>emil.babra@chasacademy.se</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Contact;