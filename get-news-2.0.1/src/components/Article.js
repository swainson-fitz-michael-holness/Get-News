import React, { Component } from "react";
import Analysis from "./Analysis.js";

let freezeVp = function (e) {
    e.preventDefault();
};

function stopBodyScrolling(bool) {
    if (bool === true) {
        document.body.addEventListener("touchmove", freezeVp, false);
    } else {
        document.body.removeEventListener("touchmove", freezeVp, false);
    }
}


//for constructing date format
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

//=============================================================
//Component which presents AI analysis content
//=============================================================
class ArticleCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: "Loading",
            chartID: null,
            date: new Date(
                this.props.date
            ).toLocaleDateString("en-US", options),
            pic: "null",
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        stopBodyScrolling(true);
        this.setState({
            init: (
                <Analysis
                    dataURL={this.props.url}
                    chartID={"C" + this.props.ID}
                    dataDate={this.props.date}
                    dataTitle={this.props.title}
                    dataInfo={this.props.info}
                    dataSource={this.props.sourceName}
                    dataImg={this.props.img}
                />
            )
        });
    }

    handleClose(e) {
        e.preventDefault();
        stopBodyScrolling(false);
    }

    componentDidMount() {

        const pic = document.getElementById("pic" + this.props.ID);
        pic.onerror = function () {
            this.style.display = "none";
        }
    }

    render() {
        return (
            <div className="col-md-6" style={{ marginBottom: "50px" }}>
                <div
                    className="card shadow-sm"
                    style={{
                        width: "auto",
                        padding: "0px",
                        borderRadius: "5px",
                        border: "none"
                    }}
                >
                    <img
                        id={"pic" + this.props.ID}
                        className="pic card-img-top"
                        style={{ borderRadius: "5px 5px 0px 0px" }}
                        src={
                            this.props.img ||
                            "https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&auto=format&fit=crop&w=1069&q=80"
                        }

                        alt="img"

                    />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.info}</p>

                        <button
                            type="button"
                            className="card-link btn btn-primary rounded-circle"
                            data-toggle="modal"
                            data-target={"#Z" + this.props.ID}
                            style={{ marginRight: "20px" }}
                            onClick={this.handleClick}
                        >
                            <i
                                className="fas fa-chart-bar "
                                style={{ fontSize: "0.9rem" }}
                            />{" "}
                        </button>

                        <div
                            className="modal fade"
                            id={"Z" + this.props.ID}
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
                                            <span aria-hidden="true">
                                                &times;
                                            </span>
                                        </button>
                                    </div>
                                    <div id="analysis-content" className="modal-body">
                                        {this.state.init}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                            onClick={this.handleClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            target="_blank"
                            href={this.props.url}
                            className="card-link"
                        >
                            {this.props.sourceName}
                        </a>
                        {//<i
                            //className="fab fa-twitter"
                            //style={{
                            //float: "right",
                            //marginTop: "10px",
                            //fontSize: "1.1rem",
                            //color: "#007bff",
                            // cursor: "pointer"
                            //}}
                            //>
                        }
                    </div>
                    <div
                        className="card-footer text-muted"
                        style={{ backgroundColor: "white" }}
                    >
                        {this.state.date}
                    </div>
                </div>
            </div>
        );
    }
}
// --END

export default ArticleCard;
