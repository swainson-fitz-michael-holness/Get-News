import React, { Component } from "react";
//import $ from "jquery";
import Home from './Home.js';
import fire from '../config/Access.js';

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
        this.handleSearch = this.handleSearch.bind(this);
    }

    logOut() {
        fire.auth().signOut();
    }

    handleChange(e){
        e.preventDefault();
        this.setState({
            val: e.target.value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
//           firstLoad: !this.state.firstLoad,
            valSubmit: this.state.val
        });

    }

    handleSearch(el){

    }

    render() {
        const news = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse "
                        id="navbarSupportedContent"
                    >

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href={null}>
                                    Articles <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={null}>
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a onClick={this.logOut} href={null} className="nav-link" >
                                    Log Out
                                </a>
                            </li>

                        </ul>

                        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.val} onChange={this.handleChange}/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <Home term={news.valSubmit}/>
            </div>

        );

    }
}

export default NavigationLogIn;
