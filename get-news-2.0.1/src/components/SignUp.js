import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: <div style={{ marginTop: "400px" }}>this is it</div>
        }
    }

    render() {
        return (
            <div>
                {this.state.init}
            </div>
        )
    }
}

export default SignUp;