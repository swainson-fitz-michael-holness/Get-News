import React, { Component } from "react";
import fire from "../config/Access.js";
import Dashboard from './Dashboard.js';
import {Animated} from "react-animated-css";

class RenderDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            tag: [],
            content: "",
            filterVal:"",
//            filterSubmit: "",

        };

        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount(){
        const rDash = this.state;


        rDash.db.ref(rDash.user.uid + "/articles").once("value",
            el => {
                let tag = Object.keys(el.val());

                this.setState({
                    tag: tag,
                    content: tag.map(val => {return <Dashboard key={val} keyID={val} numkey={tag.indexOf(val)} title={el.val()[tag[tag.indexOf(val)]].title} />}),
                    filterSubmit: tag.length
                });
            }
        );

    }

    handleFilter(e){
        e.preventDefault();
        const cContent = document.querySelectorAll(".card-title");
        const card = document.querySelectorAll(".col-md-6");
//        console.log(cContent[0].innerHTML.toUpperCase().indexOf(this.state.filterVal.toUpperCase()));
//        console.log(cContent[0].innerHTML.toUpperCase());
        let g;
        let list = 0;

        for(g = 0; g< cContent.length; g++ ) {
            if(cContent[g].innerHTML.toUpperCase().indexOf(this.state.filterVal.toUpperCase()) > -1) {
                list++;
//                console.log(list);

                card[g].style.display = "";
            } else {
                card[g].style.display = "none";
            }
        }

        this.setState({
            filterSubmit: document.querySelectorAll(".col-md-6").length,
        });
    }

    handleFilterChange(e){
        e.preventDefault();

        this.setState({
            filterVal: e.target.value
        });
    }

    render() {
        return(
            <div style={{ marginTop: "80px" }} className="container">
               <div className="jumbotron " style={{backgroundColor: "rgba(255,255,255,0)", height: "17px"}}>


              <div className="" style={{width: "80%", display: "block", margin: "auto", }}>


                 <Animated animationIn="fadeIn" isVisible={true}>
                     <form className="form-inline input-group mb-3" onSubmit={this.handleFilter}>
                            <input className="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" value={this.state.val} onChange={this.handleFilterChange}/>
                            <div className="input-group-prepend">
                                <button className="btn btn-primary " type="submit"><i className="fas fa-filter" data-toggle="tooltip" data-placement="top" title="Filter saved results of summary"></i></button>
                            </div>



                        </form>
                 </Animated>

              </div>

              </div>

                <div className="row" style={{ marginBottom: "190px" }}>
                    {this.state.content}

                </div>

            </div>
        );
    }
}

export default RenderDashboard;
