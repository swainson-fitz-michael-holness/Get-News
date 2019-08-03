import React, { Component } from "react";
import firebase from 'firebase';
import logoHD from "../img/reportralt.png";
import Login from "../user/Login.js";
import Verify from "./Verify.js";
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


const register = {};

// firebase.auth().onAuthStateChanged(function (user) {
//     register.verified = user.emailVerified;
//     if (user.emailVerified) {
//         // User is signed in.
//         // user.sendEmailVerification().then(function () {
//         //     alert("working")
//         // }).catch(function (error) {
//         //     // An error happened.
//         // });

//     } else {
//         console.log(user.emailVerified)
//     }
// });



class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: <div style={{ marginTop: "400px" }}>this is it</div>,
            email: '',
            password: '',
            redirect: false,
            sendVerify: false,
            errorMessage: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    signup = (e) => {
        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            console.log(user);
            // user.sendEmailVerification().then(function () {
            //     alert("!!!!")
            // }).catch(function (error) {
            //     console.log(error)
            //     alert(error)
            // });
            // this.setState({
            //     sendVerify: true
            // });

            if (user.emailVerified) {
                this.setState({
                    redirect: true,
                });
            } else {
                this.setState({
                    sendVerify: true
                });
            }



        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({
                errorMessage: error.message
            });
            // ...
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // user.sendEmailVerification().then(function () {
                //     alert("working")
                // }).catch(function (error) {
                //     // An error happened.
                // });
                // if (user.emailVerified) {
                //     this.setState({
                //         redirect: true,
                //     });
                // } else {
                //     this.setState({
                //         sendVerify: true
                //     });
                // }


            } else {

            }
        });

    }

    render() {
        console.log(this.state.redirect)
        if (this.state.redirect === true) {
            return <Redirect to="/" />
        } else if (this.state.sendVerify === true) {
            return <Redirect to="/verify" />
        }
        return (
            <HashRouter baseName="/apps/reportra/">

                <div className="container">
                    <img src={logoHD} alt="" style={{ width: "180px", height: "auto", display: "block", margin: "auto", marginTop: "100px" }} />
                    <form>

                        <div className="form-group login-box border-primary rounded shadow-lg" style={{ marginTop: "20px" }}>

                            <h1 style={{ textAlign: "center", margin: "0px", fontSize: "1.1rem", fontWeight: "600" }}>Use Ai to analyze the news</h1>
                            <p style={{ textAlign: "center", margin: "2px 0px 20px 0px", fontSize: "0.8rem", opacity: 0.5 }}>Sign up today</p>

                            <div>
                                {/* <p style={{ marginBottom: "0px", fontSize: "0.9rem", opacity: 0.8 }}>E-mail</p> */}
                                <input value={this.state.email} onChange={this.handleChange} name="email" type="email" id="user" placeholder="Email " className="form-control label" />
                            </div>

                            <div>
                                {/* <p style={{ marginBottom: "0px", marginTop: "25px", fontSize: "0.9rem", opacity: 0.8 }}>Password*</p> */}
                                <input value={this.state.password} onChange={this.handleChange} name="password" type="password" id="password" placeholder="password" className="form-control label" />
                            </div>
                            <p style={{ textAlign: "center", margin: "0px 0px 0px 0px", fontSize: "0.8rem", color: "red" }}>{this.state.errorMessage}</p>

                            <div className="login-btn">

                                <button onClick={this.signup} type="button" className="btn btn-block btn-primary">
                                    Sign up
                            </button>
                            </div>

                            <h1 style={{ textAlign: "center", margin: "10px 0px 0px 0px", fontSize: "0.8rem", fontWeight: "600" }}>Already signed up? <span><Link to="/">Log in</Link></span></h1>

                        </div>
                    </form>
                    <Switch>
                        <Route path="//" component={Login} />
                        <Route path="/verify" component={Verify} />
                        {/* <Route path="/lab" component={Lab} /> */}
                    </Switch>
                </div>

            </HashRouter >
        )
    }
}

export default SignUp;