import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser
        };
    }

    componentDidMount() {
        const dash = this.state;

        dash.db.ref(dash.user.uid + "/articles").once(
            "value",
            el => {
                console.log(el.val());
            },
            err => {}
        );
    }

    render() {
        return (
            <div style={{ marginTop: "80px" }} className="container">
                <div className="col-md-6" style={{ marginBottom: "50px" }}>
                    <div
                        className="card shadow"
                        style={{
                            width: "auto",
                            padding: "0px",
                            borderRadius: "7px",
                            border: "none"
                        }}
                    >
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h5 className="card-title">Title</h5>
                                        <p className="card-text">
                                            info goes here
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        <button
                                            type="button"
                                            className="card-link btn btn-primary rounded-circle"
                                            data-toggle="modal"
                                            data-target={"#Z" + this.props.ID}
                                            style={{ marginRight: "20px" }}
                                            onClick={this.handleClick}
                                        >
                                            <i
                                                className="fas fa-plug "
                                                style={{ fontSize: "0.9rem" }}
                                            />{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
