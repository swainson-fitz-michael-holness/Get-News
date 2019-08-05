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
            init: ""
        }
        this.user = firebase.auth().currentUser;
        // this.user.sendEmailVerification().then(function () {
        // }).catch(function (error) {
        //     console.log(error)
        //     // alert(error)
        // });

    }
    componentDidMount() {
        console.log(firebase.auth().currentUser);

        if (this.user.emailVerified) {
            console.log("isVerified");
        } else {
            console.log("please validate");
            this.setState({
                init: (
                    <div>
                        <h1 style={{ marginTop: "178px", color: "rgb(60, 144, 223)" }}>Please Verify</h1>
                        <p>Just one more step. Check your e-mail inbox and click the link to complete the sign up process. If you didn't get the link try sending again.</p>

                        <button style={{ width: "80px" }} type="button" className="btn btn-block btn-primary">send</button>
                    </div>
                ),
            });
        }
    }
    render() {
        return (
            <div className="container">
                {this.state.init}
            </div>
        );
    }
}

export default Verify;

