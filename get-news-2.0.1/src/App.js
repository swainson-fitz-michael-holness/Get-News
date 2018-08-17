import React, { Component } from 'react';
import './App.css';
import Login from './user/Login.js';
import fire from './config/Access.js';
import Home from './components/Home';
import Load from './components/Load.js';


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
        }
    }

    componentDidMount(){
       this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({ user: user });

                console.log("logged In");
            } else {
                // No user is signed in.
                this.setState({ user: null });
                console.log("logged out")
            }
        });
    }

//        if(this.state.user){
//            return <Home/>
//        } else {
//            return <Login/>
//        };

    render() {

        return (
            <div>
                { this.state.user ? <Home/> : <Login/>}
            </div>
        );

    }
}

export default App;
