import React, { Component } from "react";
import $ from "jquery";
//import Chart from "chart.js";
import fire from "../config/Access.js";
import DbAnalysis from "./DbAnalysis.js";



//for constructing date format
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

//The dashboard is meant for the user to quickly view a collection of saved articles. When the user finds an article they've saved they can delete, share, ect They can also track an article to a topic.
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            keys: null,
            title: "",
            init: "Loading...",
            img: require("../img/place.png"),
        };

        this.handleClickCtrl = this.handleClickCtrl.bind(this);
        this.handleDel = this.handleDel.bind(this);
    }

    componentDidMount() {
        const dash = this.state;

        dash.db.ref(dash.user.uid + "/articles").once(
            "value",
            el => {
                let tag = Object.keys(el.val());
                this.setState({
                    keys: Object.keys(el.val()),
                    title: el.val()[tag[this.props.numkey]].title,
                    img: "https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&auto=format&fit=crop&w=1069&q=80",
                    date:  new Date(
                        el.val()[tag[this.props.numkey]].date
                ).toLocaleDateString("en-US", options),
                    image: el.val()[tag[this.props.numkey]].image,
                    dbData: el.val(),
//                    tag: Object.keys(this.state.dbData)
                });
            },
            err => {}
        );

         const picImg = document.getElementById("picImg"+this.props.keyID);
            picImg.onerror = function () {
            this.style.display = "none";
        }
    }

    handleDel(e){
        e.preventDefault();
                this.state.db
            .ref(this.state.user.uid + "/articles/" + this.props.keyID)
            .remove(el => {
                    let cardDisplay = document.getElementById("del"+this.props.keyID) ;
//                    $("#del"+this.props.keyID).css("display", "none");
//                    console.log($("#del"+this.props.keyID))
                    cardDisplay.parentNode.removeChild(cardDisplay);
                });
    }

    handleClickCtrl(e) {
        e.preventDefault();
//        console.log(this.state.dbData[Object.keys(this.state.dbData)[this.props.numkey]].title)

        this.setState({
            init: (
                <DbAnalysis
                    dataURL={this.props.url}
                    chartID={"C" + this.props.ID}
                    dataDate={this.state.date}
                    dataTitle={this.state.title}
                    dataInfo={this.props.info}
                    dataSource={this.props.sourceName}
                    dataImg={this.props.img}
                    dataKeyID={this.props.keyID}
                />
            ),
        });
    }

    render() {
        return (
            <div id={"del" + this.props.keyID} className="col-md-6 " style={{ marginBottom: "50px" }}>
                <div
                    className="shadow-sm row"
                    style={{
                        margin: "0px 5px 0px 0px",
                        borderRadius: "4px 4px 0px 0px",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        className="col-sm-4"
                        style={{ padding: "0px", minHeight: "100px" ,
                               backgroundImage: 'url("https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&auto=format&fit=crop&w=1069&q=80")',
                                    backgroundSize: "cover", backgroundColor: "none"
                               }}
                    >
                        <img
                           id={"picImg" + this.props.keyID}
                            className="mr-3 img-fluid "
                            src={
                                this.state.image ||
                                this.state.img
                            }
                            alt="ariticle "
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "inline",
                                objectFit: " cover",
                                borderRadius: "4px 0px 0px 0px",

                            }}
                        />
                    </div>

                    <div className="col-sm-8">
                        <p className="card-title" style={{ fontSize: "1rem", marginTop: "15px"}}>
                            {this.state.title}
                        </p>

                    </div>

                    <div
                        className="modal fade"
                        id={"Z" + this.props.keyID}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                    {this.props.title}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.state.init}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="row shadow-sm"
                    style={{
                        margin: "0px 5px 0px 0px",
                        borderRadius: "0px 0px 4px 4px",
                        backgroundColor: "white",
                        borderTop: "1px solid #dddddd"
                    }}
                >
                    <div className="col-sm-12 ">
                        <div style={{ float: "right" }}>


                        <div className="dropdown dropleft">
                          <button className="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "none", color: "#787d87",  }}>
                            <i
                                    className="fas fa-ellipsis-v"
                                    style={{ fontSize: "0.9rem" }}
                                />
                          </button>
                          <div className="dropdown-menu shadow-lg" aria-labelledby="dropdownMenuButton" style={{border: "0", }}>

                            <button
                                type="button"
                                className=" btn"
                                data-toggle="modal"
                                data-target={"#Z" + this.props.keyID}
                                onClick={this.handleClickCtrl}
                                style={{ background: "none", color: "#787d87" }}
                            >
                                <i
                                    className="far fa-chart-bar"
                                    style={{ fontSize: "1rem", marginRight: "5px", color: "#007bff" }}
                                /> <span >Analysis</span>
                            </button>

                            <button onClick={(e) => {this.handleDel(e);this.props.handleClick(e);} }
                                type="button"
                                className=" btn  "
                                 style={{background: "none", color: "red"}}>
                                    <i className="far fa-trash-alt" style={{ fontSize: "1rem", marginRight: "9px", color: "red" }}></i>
                                    <span >Delete</span>
                                </button>

                          </div>
                        </div>

                        </div>

                        <p
                            style={{
                                fontSize: "0.9rem",
                                opacity: "0.5",
                                paddingTop: "8px",
                                marginBottom: "10px",
                                width: "70%"
                            }}
                        >
                            {this.state.date}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
