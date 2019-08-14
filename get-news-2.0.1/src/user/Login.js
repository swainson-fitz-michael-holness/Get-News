import React, { Component } from 'react';
import logoHD from "../img/reportralt.png";
import '../App.css';
import firebase from 'firebase';
// import NavigationLogOut from '../components/NavigationLogOut.js'

const actionCodeSettings = {
    url: "http://localhost:3000/"
};

class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            backPass: <button type="button" className="btn btn-link">Forgot Password?</button>,
            forgotMessage: "We will send you an email to reset your password.",
            forgotTitle: "Forgot password"
        }
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            // Handle Errors here.

            this.setState({
                errorMessage: error.message
            });

            // ...
        });
        // console.log(e.target.name);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    forgotPassword = () => {
        document.getElementById("passwordInput").style = "display: none";
        document.getElementById("loginPass").style = "display: none";
        document.getElementById("actionForgot").style = "display: none";
        document.getElementById("forgotPass").style = "display: block";
        document.getElementById("infoPass").style = "display: block";
        document.getElementById("actionBack").style = "display: block";
    };

    submitForgottenPass = () => {
        // alert(this.state.email)
        firebase.auth().sendPasswordResetEmail(this.state.email, actionCodeSettings).then(() => {
            // Email sent.
            document.getElementById("actionBack").style = "display: none";
            document.getElementById("user").style = "display: none";
            document.getElementById("forgotPass").style = "display: none";

            this.setState({
                forgotMessage: "Please check your email to reset password.",
                forgotTitle: "Success!"
            });
        }).catch(function (error) {
            // An error happened.
            alert(error.message);
        });
    };

    handleBack = () => {
        document.getElementById("passwordInput").style = "display: block";
        document.getElementById("loginPass").style = "display: block";
        document.getElementById("actionForgot").style = "display: block";
        document.getElementById("forgotPass").style = "display: none";
        document.getElementById("infoPass").style = "display: none";
        document.getElementById("actionBack").style = "display: none";
    };

    render() {
        return (
            <div className="container">
                {/* < NavigationLogOut /> */}
                <img src={logoHD} alt="" style={{ width: "180px", height: "auto", display: "block", margin: "auto", marginTop: "100px" }} />
                <form>
                    <div className="form-group login-box border-primary rounded shadow-lg" style={{ marginTop: "20px", }}>
                        <div id="infoPass" style={{ display: "none" }}>
                            <h1 style={{ textAlign: "center", margin: "0px", fontSize: "1.1rem", fontWeight: "600" }}>{this.state.forgotTitle}</h1>
                            <p style={{ textAlign: "center", margin: "2px 0px 20px 0px", fontSize: "0.8rem", opacity: 0.5 }}>{this.state.forgotMessage}</p>
                        </div>


                        <div>
                            <input value={this.state.email} onChange={this.handleChange} name="email" type="email" id="user" placeholder="Email address..." className="form-control label" />
                        </div>

                        <div id="passwordInput">
                            <input value={this.state.password} onChange={this.handleChange} name="password" type="password" id="password" placeholder="password..." className="form-control label" />
                        </div>

                        <p style={{ textAlign: "center", margin: "0px 0px 0px 0px", fontSize: "0.8rem", color: "red" }}>{this.state.errorMessage}</p>

                        <div className="login-btn">

                            <button id="loginPass" onClick={this.login} type="button" className="btn btn-block btn-primary">
                                Log in
                            </button>

                            <button id="forgotPass" onClick={this.submitForgottenPass} type="button" className="btn btn-block btn-primary" style={{ display: "none" }}>
                                Submit
                            </button>
                        </div>
                        <div id="actionForgot">
                            <h1 onClick={this.forgotPassword} style={{ textAlign: "center", margin: "10px 0px 0px 0px", fontSize: "0.8rem", fontWeight: "600", cursor: "pointer" }}>{this.state.backPass}</h1>
                        </div>

                        <div id="actionBack" style={{ display: "none" }}>
                            <h1 style={{ textAlign: "center", margin: "10px 0px 0px 0px", fontSize: "1.4rem", fontWeight: "600", cursor: "pointer" }} onClick={this.handleBack}><i className="far fa-arrow-alt-circle-left"></i></h1>
                        </div>

                    </div>
                </form>
            </div>

        );
    }
}

export default Login;
