import React, { Component } from "react";
//import $ from "jquery";
import Chart from "chart.js";
import fire from "../config/Access.js";

class DbAnalysis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load: <div>loading</div>,
            db: fire.database(),
            user: fire.auth().currentUser,
            keys: null,
            title: "",
            date: "",
            image: ""
        }
    }

    componentDidMount(){
        this.setState({
            load: <div>Loaded</div>
        });

        const dash = this.state;

        dash.db.ref(dash.user.uid + "/articles").once(
            "value",
            el => {
                let tag = Object.keys(el.val());
                this.setState({
                    keys: Object.keys(el.val()),
                    title: el.val()[tag[this.props.numkey]].title,
                    date: el.val()[tag[this.props.numkey]].date,
                    image: el.val()[tag[this.props.numkey]].image,
                    dbData: el.val(),
                    loaded: <div>Loaded</div>
                });
            },
            err => {}
        );
    }

    render(){
        let state = this.state;
        return (
            <div>
                {this.state.load}
            </div>
        );
    }
}

export default DbAnalysis;
