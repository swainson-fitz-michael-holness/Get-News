import React, { Component } from "react";
import fire from "../config/Access.js";
import Dashboard from './Dashboard.js';
import { Animated } from "react-animated-css";

class RenderDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            tag: [],
            content: "",
            filterVal: "",
            savedIsLoaded: false,
            savedNum: "",

        };

        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const rDash = this.state;


        rDash.db.ref(rDash.user.uid + "/articles").once("value",
            el => {
                if (el.val() !== null) {
                    let tag = Object.keys(el.val());

                    this.setState({
                        tag: tag,
                        content: tag.map(val => { return <Dashboard key={val} keyID={val} handleClick={this.handleClick} numkey={tag.indexOf(val)} title={el.val()[tag[tag.indexOf(val)]].title} /> }),
                        filterSubmit: tag.length,
                        savedIsLoaded: true,
                        savedNum: Object.keys(el.val()).length
                    });
                } else {
                    this.setState({
                        content: <div className="alert alert-warning" role="alert" style={{ display: "block", margin: "auto", textAlign: "center" }}>
                            You do not have any saved articles yet!
                                </div>
                    });
                }
            }
        );

    }

    //     componentDidUpdate(prevProps, prevState) {
    //
    //        if((document.querySelectorAll(".col-md-6").length !== prevState.savedNum)){
    //             fire.database().ref(fire.auth().currentUser.uid + "/articles").once("value", el => {
    //                if(el.val() !== null){
    //
    //                    this.setState({
    //                        savedNum: Object.keys(el.val()).length
    //                    });
    //
    //                } else {
    //                    this.setState({
    //                        savedNum: 0
    //                    });
    //                }
    //            });
    //
    //        }
    //    }

    handleClick(e) {
        e.preventDefault();

        fire.database().ref(fire.auth().currentUser.uid + "/articles").once("value", el => {
            //             let cardDisplay = document.getElementById("del"+this.props.keyID) ;
            //cardDisplay.parentNode.removeChild(cardDisplay);

            console.log()

            if (el.val() !== null) {

                this.setState({
                    savedNum: Object.keys(el.val()).length
                });

            } else {
                this.setState({
                    savedNum: 0,
                    //                        content: <div className="alert alert-warning" role="alert" style={{ display:"block", margin:"auto", textAlign:"center"}}>
                    //                                  No saved articles left!
                    //                                </div>
                });
            }
        });


    }

    handleFilter(e) {
        e.preventDefault();
        const cContent = document.querySelectorAll(".card-title");
        const card = document.querySelectorAll(".col-md-6");

        let g;
        let list = 0;

        for (g = 0; g < cContent.length; g++) {
            if (cContent[g].innerHTML.toUpperCase().indexOf(this.state.filterVal.toUpperCase()) > -1) {
                list++;
                //                console.log(list);

                card[g].style.display = "";
            } else {
                card[g].style.display = "none";
            }
        }

        this.setState({
            savedNum: list,
        });
    }

    handleFilterChange(e) {
        e.preventDefault();

        this.setState({
            filterVal: e.target.value
        });
    }

    render() {
        return (
            <div style={{ marginTop: "80px" }} className="container">
                <div className="jumbotron " style={{ backgroundColor: "rgba(255,255,255,0)", height: "17px" }}>


                    <div id="home-search" style={{ display: "block", margin: "auto", }}>


                        <Animated animationIn="fadeIn" isVisible={true}>
                            <form className="form-inline input-group mb-3" onSubmit={this.handleFilter}>
                                <input className="form-control mr-sm-2" type="search" placeholder="filter saved articles..." aria-label="Search" value={this.state.val} onChange={this.handleFilterChange} />
                                <div className="input-group-prepend">
                                    <button className="btn btn-primary " type="submit"><i className="fas fa-filter" data-toggle="tooltip" data-placement="top" title="Filter saved results of summary"></i></button>
                                </div>



                            </form>
                        </Animated>

                    </div>

                </div>

                <div style={{ marginBottom: "0px", opacity: "0.5", marginTop: "10px", marginLeft: "0px", }}>{this.state.savedIsLoaded === true ? <div> Articles <span className="badge badge-pill badge-success"> {this.state.savedNum}</span></div> : ""} </div>

                <hr />

                <div className="row" style={{ marginBottom: "190px" }}>
                    {this.state.content}

                </div>

            </div>
        );
    }
}

export default RenderDashboard;
