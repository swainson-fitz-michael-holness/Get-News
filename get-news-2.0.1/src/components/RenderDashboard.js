import React, { Component } from "react";
import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";
import Dashboard from './Dashboard.js';

class RenderDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: fire.database(),
            user: fire.auth().currentUser,
            tag: [],
            content: ""
        };
    }

    componentDidMount(){
        const rDash = this.state;
//        console.log(this.state.db.ref(rDash.user.uid + "/articles"))
        rDash.db.ref(rDash.user.uid + "/articles").once(
            "value",
            el => {
                let tag = Object.keys(el.val());
//                console.log(el.val()[tag[0]].title)
                this.setState({
                    tag: tag,
                    content: tag.map(val => <Dashboard key={val} keyID={val} numkey={tag.indexOf(val)} title={el.val()[tag[tag.indexOf(val)]].title}/>)
                });

            },
            err => {}
        );
    }

    render(){

        return(
            <div style={{ marginTop: "80px" }} className="container">
                <div className="row" style={{ marginBottom: "50px" }}>
                    {this.state.content}
                </div>
            </div>
        );
    }
};

export default RenderDashboard;
