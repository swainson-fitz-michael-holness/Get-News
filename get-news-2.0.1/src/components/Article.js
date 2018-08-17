import React, { Component } from 'react';

class ArticleCard extends Component {
    render(){
        return(

            <div className="card col-md-6" style={{width: "18rem"}}>
                <img className="card-img-top" src={this.props.img} alt="ariticle "/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.info}</p>
                    <button  className="btn btn-primary">Go somewhere</button>
                </div>
            </div>

        );
    }
};

export default ArticleCard;
