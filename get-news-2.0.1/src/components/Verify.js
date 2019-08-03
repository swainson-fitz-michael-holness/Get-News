import React, { Component } from "react";
// import logoHD from "../img/reportralt.png";
// import Login from "../user/Login.js";
// import { Route, Switch, Link, Redirect } from 'react-router-dom';
// import { HashRouter } from 'react-router-dom';
import firebase from 'firebase';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: null
        }
    }
    componentDidMount() {
        console.log(firebase.auth().currentUser);
        const user = firebase.auth().currentUser;
        if (user.emailVerified) {
            console.log("isVerified");
        } else {
            console.log("please validate");
        }
    }
    render() {
        return (
            <div>
                <h1 style={{ marginTop: "400px" }}>Hello</h1>
                <p>test</p>
            </div>
        );
    }
}

export default Verify;

