import React, { Component } from 'react';

class ArticleCard extends Component {
    render(){
        return(

            <div className="card col-md-6" style={{width: "18rem"}}>
                <img className="card-img-top" src="./test.png" alt="ariticle "/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button  className="btn btn-primary">Go somewhere</button>
                </div>
            </div>

        );
    }
};

export default ArticleCard;
