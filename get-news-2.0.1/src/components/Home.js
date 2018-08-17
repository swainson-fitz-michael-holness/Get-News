import React, { Component } from 'react';
import fire from '../config/Access.js';
import NavigationLogIn from './NavigationLogIn.js'
import ArticleCard from './Article.js'



class Home extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        fire.auth().signOut();
    }

    render(){
        return (

            <div className="container">
               <NavigationLogIn/>

               <div className="row">
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                   <ArticleCard />
                   <ArticleCard />
                   <ArticleCard />
               </div>

            </div>
        )

    }
}

export default Home;
