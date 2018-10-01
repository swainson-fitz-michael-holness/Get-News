import React, { Component } from "react";
import Home from "./Home.js";
import fire from "../config/Access.js";
import '../App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
//import Dashboard from './Dashboard.js';
import $ from 'jquery';
import RenderDashboard from './RenderDashboard.js';
import Lab from './Lab.js';
import logo from "../img/reportra.png"


class NavigationLogIn extends Component {
    constructor(props){
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

    checkSaved(e){
        e.preventDefault();
        if(this.state.bars === "fas fa-bars") {
            this.setState({
                bars: "fas fa-times"
            });
        } else {
            this.setState({
                bars: "fas fa-bars"
            });
        }

    }

    componentDidMount(){
//        console.log(document.querySelector("#test"))
//
//        $('#test>li>div>a').on('click', function(){
//            $("#navbarSupportedContent").toggle("hide");
//        });
//        $('#hamburger').on('click', function(){
//            console.log($("#navbarSupportedContent").toggle("show"));
//        });

    }

//    load Navbar
    render() {
        const news = this.state;


        return (
            <BrowserRouter>
            <div>

                <nav style={{backgroundColor:"#3c90df"}} className="navbar fixed-top navbar-expand-lg navbar-dark shadow ">

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
                        style={{border: "none", outline: "none",}}
                        onClick={this.checkSaved}
                    >
                        <span id=" h-icon " className="" style={{width: "30px", height: "35px", }}><i className={news.bars}></i></span>
                    </button>

                    <span className="navbar-brand mb-0 h1">
                       <img src={logo} alt="logo" style={{height: "30px", width: "auto"}}/>

                    </span>


                    <div
                        className="collapse navbar-collapse ml-auto"
                        id="navbarSupportedContent"
                    >


                        <ul id="test" className="navbar-nav mr-auto">

                            <li className="nav-item active lt" >

                                <div className="nav-link " style={{marginRight: "10px"}}><Link to="/apps/reportra" style={{color: "white", textDecoration: "none"}}><i className="fas fa-newspaper" style={{marginRight: "3px", }}></i> Articles</Link></div>
                            </li>
                            <li className="nav-item lt" >
                                <div className="nav-link " style={{marginRight: "10px"}} href={null}><Link style={{color: "white", textDecoration: "none"}} to="/apps/reportra/Dashboard" ><i className="fas fa-save" style={{marginRight: "3px", }}></i > Saved <span className="badge badge-secondary">{this.state.saved}</span></Link></div>
                            </li>
                            <li className="nav-item lt" >
                                <div className="nav-link " style={{marginRight: "10px"}} href={null}><Link style={{color: "white", textDecoration: "none"}} to="/apps/reportra/Lab" ><i className="fas fa-flask" style={{marginRight: "3px", }}></i > Lab</Link></div>
                            </li>
                            <li className="nav-item lt">
                                <a  onClick={this.logOut} href={null} className="nav-link" style={{cursor: "pointer", color: "white", textDecoration: "none"}}>
                                    <i className="fas fa-sign-out-alt" style={{marginRight: "3px", }}></i> Log Out
                                </a>
                            </li>

                        </ul>



                    </div>
                    </div>
                </nav>

            <Switch>
                <Route
                    path="/apps/reportra"
                    render={(props => <Home {...props} term={news.valSubmit}/>)}
                    exact
                />
                <Route path="/apps/reportra/Dashboard" component={RenderDashboard} />
                <Route path="/apps/reportra/Lab" component={Lab} />
            </Switch>
            </div>
</BrowserRouter>
        );

    }
}

export default NavigationLogIn;
//            <div style={{marginTop:"70px"}}>
//                <Home  term={news.valSubmit}/>
//            </div>
