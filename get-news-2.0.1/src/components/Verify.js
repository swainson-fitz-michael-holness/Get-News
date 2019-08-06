import React, { Component } from "react";
// import logoHD from "../img/reportralt.png";
// import Login from "../user/Login.js";
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import firebase from 'firebase';
import Home from "./Home.js"

const actionCodeSettings = {
    url: "http://localhost:3000/"
};

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: "",
            displayName: "",
            redirect: false

        }
        this.user = firebase.auth().currentUser;


    }

    handleSend = (e) => {
        e.preventDefault();
        if (!this.user.emailVerified) {
            this.user.sendEmailVerification(actionCodeSettings).then(() => {
                alert("Success! please check your email.");
            }).catch(function (error) {
                console.log(error)
                alert(error);
            });
        } else {
            alert("You are already verified!")
        }
    }

    logOut = () => {
        firebase.auth().signOut();
    }

    reload = () => {
        window.location.reload();
    }

    // onFocus = () => {
    //     if (this.user.emailVerified) {
    //         this.setState({
    //             init: (
    //                 <div style={{ maxWidth: "700px" }}>
    //                     <h1 style={{ marginTop: "178px", color: "rgb(60, 144, 223)" }}>Welcome {firebase.auth().currentUser.displayName} </h1>
    //                     <h3>Congrats you are verified!</h3>
    //                     <p>Thanks for verifying your email address. All the features of Reportra are now at your grasp.</p>


    //                     <button style={{ width: "100px", display: "inline" }} type="button" className="btn btn-block btn-primary" onClick={this.handleReload}>Go to Site</button>


    //                 </div>)
    //         });
    //     }
    // }

    componentDidMount() {
        // console.log(firebase.auth().currentUser.displayName);
        window.addEventListener("focus", this.reload);

        if (this.user.emailVerified) {
            console.log("isVerified");
            this.setState({
                init: (
                    <div style={{ maxWidth: "700px" }}>
                        <h1 style={{ marginTop: "178px", color: "rgb(60, 144, 223)" }}>Welcome {firebase.auth().currentUser.displayName} </h1>
                        <h3>Congrats you are verified!</h3>
                        <p>Thanks for verifying your email address. All the features of Reportra are now at your grasp.</p>


                        <button style={{ width: "100px", display: "inline" }} type="button" className="btn btn-block btn-primary" onClick={this.reload}>Go to Site</button>


                    </div>)
            })
        } else {
            // console.log(firebase.auth().currentUser.metadata);
            this.setState({
                init: (
                    <div style={{ maxWidth: "700px" }}>
                        <h1 style={{ marginTop: "178px", color: "rgb(60, 144, 223)" }}>Welcome {firebase.auth().currentUser.displayName} </h1>
                        <h3>Please Verify</h3>
                        <p>Just one more step. Check your e-mail inbox and click the link to complete the sign up process. If you didn't get the link try sending again.</p>


                        <button style={{ width: "80px", display: "inline" }} type="button" className="btn btn-block btn-primary" onClick={this.handleSend}>Send</button>
                        <button style={{ width: "100px", display: "inline", margin: "0px 0px 0px 20px" }} type="button" className="btn btn-block btn-primary" onClick={this.logOut}>Log Out</button>


                    </div>
                ),
            });
        }
    }

    componentWilUnmount() {
        window.removeEventListener("focus", this.reload);
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

