import React, { Component } from "react";
import fire from "../config/Access.js";
import SignUp from "./SignUp.js";
import Login from "../user/Login.js"
import logo from "../img/reportra.png";
import { Route, Switch, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

// import logoAlt from "../img/reportralt.png";
//import $ from "jquery";

class NavigationLogOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bars: "fas fa-bars"
        }
    }

    checkSaved = (e) => {
        e.preventDefault();
        if (this.state.bars === "fas fa-bars") {
            this.setState({
                bars: "fas fa-times"
            });
        } else {
            this.setState({
                bars: "fas fa-bars"
            });
        }
    }

    render() {
        const signup = this.state;
        return (
            <HashRouter baseName="/apps/reportra/">
                <div>
                    <nav style={{ backgroundColor: "#3c90df" }} className="navbar fixed-top navbar-expand-lg navbar-dark shadow ">

                        <div className="container-fluid">
                            <button
                                id="hamburger"
                                className="navbar-toggler border-0"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                style={{ border: "none", outline: "none", }}
                                onClick={this.checkSaved}
                            >
                                <span id="h-icon " style={{ width: "30px", height: "35px", }}><i className={signup.bars}></i></span>
                            </button>

                            <span className="navbar-brand mb-0 h1">
                                <img src={logo} alt="logo" style={{ height: "30px", width: "auto" }} />

                            </span>

                            <div
                                className="collapse navbar-collapse "
                                id="navbarSupportedContent"
                            >
                                <ul id="test" className="navbar-nav mr-auto">

                                    <li className="nav-item active lt" >

                                        <div className="nav-link " style={{ marginRight: "10px" }}><Link to="/" style={{ color: "white", textDecoration: "none" }}><i className="fa fa-user-circle" aria-hidden="true" style={{ marginRight: "3px", }}></i> Log in</Link></div>
                                    </li>

                                    {/* <li className="nav-item active">
                                        <a className="nav-link" href={null}>
                                            Login <span className="sr-only">(current)</span>
                                        </a>
                                    </li> */}
                                    {/* <li className="nav-item">
                                        <a className="nav-link" href={null}>
                                            About
                            </a>
                                    </li> */}


                                    <li className="nav-item lt" >
                                        <div className="nav-link " style={{ marginRight: "10px" }} href={null}><Link style={{ color: "white", textDecoration: "none" }} to="/signup" ><i className="fas fa fa-user-plus" style={{ marginRight: "3px", }}></i > sign up</Link></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </nav>

                    <Switch>
                        {/* <Route
                            path="//"
                            render={(props => <Home {...props} term={news.valSubmit} />)}
                            exact
                        /> */}
                        <Route path="//" component={Login} />
                        <Route path="/signup" component={SignUp} />

                    </Switch>
                </div>
            </HashRouter>


        );
    }
}

export default NavigationLogOut;
