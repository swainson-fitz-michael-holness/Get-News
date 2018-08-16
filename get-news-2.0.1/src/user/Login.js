import React, { Component } from 'react';
import $ from "jquery";
import '../App.css';
import firebase from 'firebase';
import NavigationLogOut from '../components/NavigationLogOut.js'

class Login extends Component {
    constructor(props){
        super(props)
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
        }
    }

    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode+' :: '+ errorMessage);

            // ...
        });
        console.log(e.target.name);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="container">
                < NavigationLogOut/>

                <form>
                    <div className="form-group login-box border-primary rounded shadow-lg">
                        <div>
                            <input value={this.state.email} onChange={this.handleChange} name="email" type="email" id="user" placeholder="Email address..." className="form-control label"/>
                        </div>

                        <div>
                            <input value={this.state.password} onChange={this.handleChange} name="password" type="password" id="password" placeholder="password..." className="form-control label"/>
                        </div>

                        <div className="login-btn">

                            <button  onClick={this.login} type="button" className="btn btn-block btn-primary">
                                Submit
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        );
    }
}

export default Login;
