import React, { Component } from "react";
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

//    load Navbar
    render() {
        const news = this.state;

        return (
            <div>

                <nav style={{backgroundColor:"white"}} className="navbar fixed-top navbar-expand-lg navbar-light shadow-sm ">
                   <div className="container">
                    <button
                        className="navbar-toggler border-0"
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
                    </div>
                </nav>



            <div >
                <Home term={news.valSubmit}/>
            </div>

            </div>

        );

    }
}

export default NavigationLogIn;
