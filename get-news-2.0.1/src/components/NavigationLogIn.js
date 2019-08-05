import React, { Component } from "react";
import Home from "./Home.js";
import fire from "../config/Access.js";
import '../App.css';
import { Route, Switch, Link } from 'react-router-dom';
//import Dashboard from './Dashboard.js';
import RenderDashboard from './RenderDashboard.js';
import Lab from './Lab.js';
import logo from "../img/reportra.png";
import { HashRouter } from 'react-router-dom'
import Verify from "./Verify.js";
import SignUp from "./SignUp.js";


class NavigationLogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            val: "",
            valSubmit: "uk",
            firstLoad: false,
            initHome: null,
            searchHome: null,
            saved: "",
            user: fire.auth().currentUser,
            db: fire.database(),
            bars: "fas fa-bars"
        };

        this.logOut = this.logOut.bind(this);
        this.checkSaved = this.checkSaved.bind(this);
    }

    //Handle log out function with firebase
    logOut() {
        fire.auth().signOut();
    }

    checkSaved(e) {
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

    componentDidMount() {
        // console.log(this.state.user.email)
    }

    //    load Navbar
    render() {
        const news = this.state;


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
                                <span id="h-icon " style={{ width: "30px", height: "35px", }}><i className={news.bars}></i></span>
                            </button>

                            <span className="navbar-brand mb-0 h1">
                                <img src={logo} alt="logo" style={{ height: "30px", width: "auto" }} />

                            </span>


                            <div
                                className="collapse navbar-collapse ml-auto"
                                id="navbarSupportedContent"
                            >


                                <ul id="test" className="navbar-nav mr-auto">

                                    <li className="nav-item active lt" >

                                        <div className="nav-link " style={{ marginRight: "10px" }}><Link to="/" style={{ color: "white", textDecoration: "none" }}><i className="fas fa-newspaper" style={{ marginRight: "3px", }}></i> Articles</Link></div>
                                    </li>
                                    <li className="nav-item lt" >
                                        <div className="nav-link " style={{ marginRight: "10px" }} href={null}><Link style={{ color: "white", textDecoration: "none" }} to="/dashboard" ><i className="fas fa-save" style={{ marginRight: "3px", }}></i > Saved <span className="badge badge-secondary">{this.state.saved}</span></Link></div>
                                    </li>
                                    <li className="nav-item lt" >
                                        <div className="nav-link " style={{ marginRight: "10px" }} href={null}><Link style={{ color: "white", textDecoration: "none" }} to="/lab" ><i className="fas fa-flask" style={{ marginRight: "3px", }}></i > Lab</Link></div>
                                    </li>
                                    <li className="nav-item lt">
                                        <a onClick={this.logOut} href={null} className="nav-link" style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>
                                            <i className="fas fa-sign-out-alt" style={{ marginRight: "3px", }}></i> Log Out
                                </a>
                                    </li>

                                </ul>



                            </div>
                        </div>
                    </nav>

                    <Switch>
                        <Route
                            path="//"
                            render={(props => <Home {...props} term={news.valSubmit} />)}
                            exact
                        />
                        <Route path="/dashboard" component={RenderDashboard} />
                        <Route path="/lab" component={Lab} />
                        <Route path="/verify" component={Verify} />
                        <Route path="/signup" render={(props => <SignUp {...props} userState="loggedIn" />)} />
                        <Route
                            render={(props => <Home {...props} term={news.valSubmit} />)}
                            exact
                        />
                    </Switch>
                </div>
            </HashRouter>
        );

    }
}

export default NavigationLogIn;
//            <div style={{marginTop:"70px"}}>
//                <Home  term={news.valSubmit}/>
//            </div>
