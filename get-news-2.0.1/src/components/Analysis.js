import React, { Component } from 'react';
import $ from "jquery";

class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: null,
        };
    }

    componentDidMount() {
            $.post(
                "https://apiv2.indico.io/texttags",
                JSON.stringify({
                    api_key: "1fd3f7fee7efe92f194cf184a5b7bfc4",
                    data: this.props.dataURL,
                    top_n: 5
                })
            ).then(res => {
                let holder = JSON.parse(res)
                let nameArr = [];
                let dataArr = [];
                for(var keyName in holder.results) {
                    nameArr.push(keyName);
                }
                for(var keyData in holder.results) {
                    dataArr.push(holder.results[keyData]);
                }
            this.setState({
            stats: nameArr
        });
                console.log(nameArr);
                });

    }

    render(){
        return (
            <div>{this.state.stats}</div>
        );
    }
};

export default Analysis;
