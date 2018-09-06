import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            keys: null
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

                        <div className="media shadow" style={{padding:"10px 10px 10px 10px", borderRadius: "7px"}}>

                           <div className="media-body" style={{}}>
                               <h5 className="card-title">Title</h5>
                               <hr/>
                                <i className="fab fa-twitter" style={{fontSize: "1.1rem", color: "#007bff", cursor: "pointer"}}></i>
                                <i className="fab fa-facebook-f" style={{fontSize: "1.1rem", color: "#007bff", cursor: "pointer", marginLeft: "13px"}}></i>
                           </div>

                            <button
                                type="button"
                                className=" btn btn-primary rounded-circle align-self-center ml-3"
                                data-toggle="modal"
                                data-target={"#Z" + this.props.ID}
                                style={{}}
                            >
                                <i
                                    className="fas fa-plug "
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
        );
    }
}

export default Dashboard;
