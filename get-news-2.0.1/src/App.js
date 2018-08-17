import React, { Component } from 'react';
import './App.css';
import Login from './user/Login.js';
import fire from './config/Access.js';
import Home from './components/Home';
import Load from './components/Load.js';

//Add Context API
const AppContext = React.createContext();

class AppProvider extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: <Load/>,
        }
    }

    render() {
        return <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    }
}

class App extends Component {


    componentDidMount(){
       this.authListener();
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                this.setState({ user: user });
                console.log(user);
            } else {
                // No user is signed in.
                this.setState({ user: null });
                console.log('signed out')
            }
        });
    }

//        if(this.state.user){
//            return <Home/> :
//        } else {
//            return <Login/>
//        };

    render() {
        return <AppProvider>
            <AppContext.Consumer>
                {(context) => context.user ? <Home/> : <Login/>}
            </AppContext.Consumer>
        </AppProvider>
    }
}

export default App;
