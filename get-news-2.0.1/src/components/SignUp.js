import React, { Component } from "react";
import firebase from 'firebase';
import logoHD from "../img/reportralt.png";


// firebase.start('#firebaseui-auth-container', {
//     signInOptions: [
//         {
//             provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//             requireDisplayName: false
//         }
//     ]
// });

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: <div style={{ marginTop: "400px" }}>this is it</div>,
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    signup = (e) => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorCode + ' :: ' + errorMessage);
            // ...
        });
    }

    render() {
        // if (this.state.toDashboard === true) {
        //     return <Redirect to='/dashboard' />
        //   }
        return (
            <div className="container">
                <img src={logoHD} alt="" style={{ width: "180px", height: "auto", display: "block", margin: "auto", marginTop: "100px" }} />
                <form>
                    <div className="form-group login-box border-primary rounded shadow-lg" style={{ marginTop: "20px" }}>
                        <div>
                            <p style={{ marginBottom: "0px" }}>E-mail:</p>
                            <input value={this.state.email} onChange={this.handleChange} name="email" type="email" id="user" placeholder="Email address..." className="form-control label" />
                        </div>

                        <div>
                            <p style={{ marginBottom: "0px", marginTop: "25px" }}>Password:</p>
                            <input style={{ marginTop: "0px" }} value={this.state.password} onChange={this.handleChange} name="password" type="password" id="password" placeholder="password..." className="form-control label" />
                        </div>

                        <div className="login-btn">

                            <button onClick={this.signup} type="button" className="btn btn-block btn-primary">
                                Sign up
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;