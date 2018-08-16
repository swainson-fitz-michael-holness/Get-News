import React, { Component } from 'react';
import fire from '../config/Access.js';

class Home extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        fire.auth().signOut();
    }

    render(){
        return (
            <div>
                <button onClick={this.logOut}>Log Out</button>
            </div>
        );
    }
}

export default Home;
