import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

//The dashboard is meant for the user to quickly view a collection of saved articles. When the user finds an article they've saved they can delete, share, ect They can also track an article to a topic.
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            keys: null,
            title: "",
        };

        this.handleClick = this.handleClick.bind(this);
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
                    date: el.val()[tag[this.props.numkey]].date,
                    image: el.val()[tag[this.props.numkey]].image
                });

            },
            err => {}
        );
    }

    handleClick(e){
        e.preventDefault();
        this.state.db.ref(this.state.user.uid + "/articles/" + this.props.keyID).remove(window.location.reload());
        console.log(this.props.keyID);


    }

    render() {
        return (
            <div className="col-md-6" style={{marginBottom: "50px", }}>
                       <div className="shadow-sm" style={{padding:"0px 10px 10px 0px", borderRadius: "7px"}}>

                        <div className="media " >
                           <img className="mr-3 img-fluid " src={this.state.image|| "https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&auto=format&fit=crop&w=1069&q=80"} alt="ariticle " style={{width: "64px", height: "64px", border: "inline", objectFit:" cover", borderRadius: "7px 0px 0px 0px"}}/>




                           <div className="media-body" style={{}}>

                               <p className="card-title" style={{fontSize: "1rem"}}>{this.state.title}</p>



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

                        <button type="button" className="btn btn-link"><i className="fas fa-bolt" style={{ fontSize: "1rem", marginRight: "10px" }}></i>track</button>

                                <div style={{float: "right", }}>

                                <button onClick={this.handleClick}
                                type="button"
                                className=" btn btn-link rounded-circle "
                                 style={{marginRight:"9px", color: "red"}}>
                                    <i className="far fa-trash-alt"></i>
                                </button>

                                 <button
                                    type="button"
                                    className=" btn btn-primary rounded-circle "
                                    data-toggle="modal"
                                    data-target={"#Z" + this.props.ID}
                                    style={{}}
                                >
                                    <i
                                        className="fas fa-plug "
                                        style={{ fontSize: "0.9rem" }}
                                    />{" "}
                                </button>
                                    </div>
                        </div>
                        </div>



        );
    }
}

export default Dashboard;
