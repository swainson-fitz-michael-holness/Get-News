import React, { Component } from "react";
//import $ from "jquery";
//import Chart from "chart.js";
import fire from "../config/Access.js";

const db = fire.database();

class DbAnalysis extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                hello
            </div>
        );
    }
}

export default DbAnalysis;
