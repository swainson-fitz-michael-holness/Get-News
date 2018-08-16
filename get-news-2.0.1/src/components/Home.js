import React, { Component } from 'react';
import fire from '../config/Access.js';
import NavigationLogIn from './NavigationLogIn.js'

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
            <div className="container">
               <NavigationLogIn/>

            </div>
        );
    }
}

export default Home;
