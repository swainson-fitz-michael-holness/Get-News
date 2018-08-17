import React, { Component } from 'react';
import './App.css';
import Login from './user/Login.js';
import fire from './config/Access.js';
import Home from './components/Home';
import Load from './components/Load.js';

//function PageLoad(props) {
//    const userIsLoaded = props.userIsLoaded;
//    if(userIsLoaded) {
//        return
//    }
//}


class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            userIsLoaded: "init"
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
                this.setState({ userIsLoaded: "logged in" });
                console.log(user);
            } else {
                // No user is signed in.
                this.setState({ user: null });
                this.setState({ userIsLoaded: "logged out" });
                console.log("logged out")
            }
        });
    }

//        if(this.state.user){
//            return <Home/>
//        } else {
//            return <Login/>
//        };

//     <div>
//                {this.state.user ? <Home/> : <Login/>}
//            </div>

    render() {

        if(this.state.userIsLoaded === "logged in"){
           return <Home/>
        } else if( this.state.userIsLoaded === "logged out") {
            return <Login/>
        } else if( this.state.userIsLoaded === "init") {
            return <Load/>
        }

    }
}

export default App;
