import React, { Component } from 'react';
import $ from "jquery";



class ArticleCard extends Component {


    render(){
        return(
            <div className="col-md-6" style={{marginBottom: "50px"}}>
                <div className="card shadow" style={{width: "auto", padding: "0", borderRadius: "10px"}}>
                <img className="card-img-top" style={{borderRadius: "10px 10px 0px 0px"}} src={this.props.img || "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"} alt="ariticle "/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.info}</p>

                    <button type="button" className="card-link btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#analysisModal" style={{marginRight: "20px"}} data-whatever={this.props.url}>Analyze</button>


                    <div className="modal fade" id="analysisModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">

                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

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
