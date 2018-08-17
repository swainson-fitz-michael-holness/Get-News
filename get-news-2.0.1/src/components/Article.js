import React, { Component } from 'react';

class ArticleCard extends Component {
    render(){
        return(
            <div className="col-md-6" style={{marginBottom: "50px"}}>
                <div className="card shadow" style={{width: "auto", padding: "0", borderRadius: "10px"}}>
                <img className="card-img-top" style={{borderRadius: "10px 10px 0px 0px"}} src={this.props.img || "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"} alt="ariticle "/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.info}</p>
                    <a target="_blank" href={this.props.url} className="card-link">{this.props.sourceName}</a>

                </div>
                <div className="card-footer text-muted">
                   {this.props.date}
                    </div>
            </div>
            </div>


        );
    }
};

export default ArticleCard;
