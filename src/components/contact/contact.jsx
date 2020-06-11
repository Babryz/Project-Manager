import React from 'react';

class Contact extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (sessionStorage.getItem('userID')) {
            return (
                <h2>Logged in</h2>
            )
        } else {
            return (
                <h2>Not logged in</h2>
            )
        }
    }
}

export default Contact;