import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: "loaded"
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