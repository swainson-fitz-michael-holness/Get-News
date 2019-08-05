import React, { Component } from 'react';
//import $ from "jquery";
import './App.css';
import Login from './user/Login.js';
import fire from './config/Access.js';
import Load from './components/Load.js';
import NavigationLogIn from "./components/NavigationLogIn.js";
import NavigationLogOut from './components/NavigationLogOut';
import Verify from './components/Verify';



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
            userIsLoaded: "init",
            emailVerified: ""
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
                this.setState({
                    user: user,
                    userIsLoaded: "logged in",
                    emailVerified: user.emailVerified
                });


            } else {
                // No user is signed in.
                this.setState({ user: null });
                this.setState({ userIsLoaded: "logged out" });
            }
        });
    }

    render() {
        console.log(this.state.emailVerified)
        if (this.state.userIsLoaded === "logged in" && this.state.emailVerified) {
            return <NavigationLogIn />
        } else if (this.state.userIsLoaded === "logged in" && !this.state.emailVerified) {
            return <Verify />
        } else if (this.state.userIsLoaded === "logged out") {
            return <NavigationLogOut />
        } else if (this.state.userIsLoaded === "init") {
            return <Load />
        }

    }
}

export default App;
