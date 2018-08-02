import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
const key = "apiKey=6c6b71cbab324fbd82b11f2c79e14456";

const url = function(endpoint, country, key) {
    return endpoint + country + key;
};

const req = new Request(
    url("https://newsapi.org/v2/top-headlines?", "country=us&", key)
);

const urlSearch = function(val) {
    return (
        "https://newsapi.org/v2/everything?" +
        "q=" +
        val +
        "&" +
        "from=2018-07-28&" +
        "language=en&" +
        "sortBy=popularity&" +
        key
    );
};
//end

//===========================================
// Code for dynamically writing search to fetch -1 ApiCall
//===========================================
class MainFrame extends React.Component {
    constructor(props) {
        // Load state values
        super(props);
        this.state = {
            value: "",
            isLoaded: false,
            getData: null,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        // Render search results here

        e.preventDefault();
    }

    componentDidMount() {
        //Make api call for states
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        getData: data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        if (this.state.isLoaded === false) {
            return <div>Loading</div>;
        } else {
            return <div>{this.state.getData.articles[0].title}</div>;
        }

        return (
            <div>
                <nav className="navbar navbar-light">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <input
                            className="form-control mr-sm-2"
                            placeholder="search"
                            type="search"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit"
                        >
                            search
                        </button>
                    </form>
                </nav>
            </div>
        );
    }
}

ReactDOM.render(<MainFrame />, document.getElementById("root"));
registerServiceWorker();
