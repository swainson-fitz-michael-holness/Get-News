import React, { Component } from 'react';
//import $ from "jquery";
import './App.css';
import Login from './user/Login.js';
import fire from './config/Access.js';
import Load from './components/Load.js';
import NavigationLogIn from "./components/NavigationLogIn.js";
import NavigationLogOut from './components/NavigationLogOut';



//function PageLoad(props) {
//    const userIsLoaded = props.userIsLoaded;
//    if(userIsLoaded) {
//        return
//    }
//}

//$("img").error(function () {
//    $(this).hide();
// or $(this).css({visibility:"hidden"});
//    });

//console.log($("img").onError)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            userIsLoaded: "init"
        }
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log(user.displayName)
                this.setState({ user: user });
                this.setState({ userIsLoaded: "logged in" });
            } else {
                // No user is signed in.
                this.setState({ user: null });
                this.setState({ userIsLoaded: "logged out" });
            }
        });
    }

    render() {

        if (this.state.userIsLoaded === "logged in") {
            return <NavigationLogIn />
        } else if (this.state.userIsLoaded === "logged out") {
            return <NavigationLogOut />
        } else if (this.state.userIsLoaded === "init") {
            return <Load />
        }

    }
}

export default App;
