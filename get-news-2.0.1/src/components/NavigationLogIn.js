import React, { Component } from "react";
import Home from "./Home.js";
import fire from "../config/Access.js";
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
//import Dashboard from './Dashboard.js';
//import $ from 'jquery';
import RenderDashboard from './RenderDashboard.js';
import Lab from './Lab.js';


class NavigationLogIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            val: "",
            valSubmit: "uk",
            firstLoad: false,
            initHome: null,
            searchHome: null,
        };

        this.logOut = this.logOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Handle log out function with firebase
    logOut() {
        fire.auth().signOut();
    }

    //Everytime an input is made in the search field fire this change function and save results in this.state.val
    handleChange(e){
        e.preventDefault();
        this.setState({
            val: e.target.value,
        })
    }

    //When the submit button is clicked update the submitted state as the current state of this.state.val
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            valSubmit: this.state.val
        });

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
                    >
                        <span id=" h-icon " className="navbar-toggler-icon" style={{width: "30px", height: "35px", }}/>
                    </button>



                    <div
                        className="collapse navbar-collapse ml-auto"
                        id="navbarSupportedContent"
                    >


                        <ul id="test" className="navbar-nav mr-auto">

                            <li className="nav-item active lt" >

                                <div className="nav-link " style={{marginRight: "10px"}}><Link to="/" style={{color: "white", textDecoration: "none"}}><i className="fas fa-newspaper" style={{marginRight: "3px", }}></i> Articles</Link></div>
                            </li>
                            <li className="nav-item lt" >
                                <div className="nav-link " style={{marginRight: "10px"}} href={null}><Link style={{color: "white", textDecoration: "none"}} to="/Dashboard" ><i className="fas fa-save" style={{marginRight: "3px", }}></i > Saved</Link></div>
                            </li>
                            <li className="nav-item lt" >
                                <div className="nav-link " style={{marginRight: "10px"}} href={null}><Link style={{color: "white", textDecoration: "none"}} to="/Lab" ><i className="fas fa-flask" style={{marginRight: "3px", }}></i > Lab</Link></div>
                            </li>
                            <li className="nav-item lt">
                                <a  onClick={this.logOut} href={null} className="nav-link" style={{cursor: "pointer", color: "white", textDecoration: "none"}}>
                                    <i className="fas fa-sign-out-alt" style={{marginRight: "3px", }}></i> Log Out
                                </a>
                            </li>

                        </ul>

                       <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.val} onChange={this.handleChange}/>
                            <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                        </form>

                    </div>
                    </div>
                </nav>

            <Switch>
                <Route
                    path="/"
                    render={(props => <Home {...props} term={news.valSubmit}/>)}
                    exact
                />
                <Route path="/Dashboard" component={RenderDashboard} />
                <Route path="/Lab" component={Lab} />
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
