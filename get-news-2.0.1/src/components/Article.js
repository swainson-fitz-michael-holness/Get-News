import React, { Component } from 'react';
import Analysis from "./Analysis.js";


//=============================================================
//Component which presents AI analysis content
//=============================================================
class ArticleCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            init: "Loading",
            chartID: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDataClick = this.handleDataClick.bind(this);
    };

    handleClick(e){
        e.preventDefault();
//        $(this).find('.modal-title').text('New message to ' )
        this.setState({
            init: <Analysis dataURL={this.props.url} chartID={"C"+this.props.ID}/>,
        });
    };

    handleDataClick(e){
        e.preventDefault();
        console.log(e.target)
    };

    render(){
        return(
            <div className="col-md-6" style={{marginBottom: "50px"}}>
                <div className="card shadow" style={{width: "auto", padding: "0", borderRadius: "10px", border: "none"}}>
                <img className="card-img-top" style={{borderRadius: "10px 10px 0px 0px"}} src={this.props.img || "https://images.unsplash.com/photo-1529243856184-fd5465488984?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=95834c9e01a9ff2a5a61c79fc92a180f&auto=format&fit=crop&w=1069&q=80"} alt="ariticle "/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.info}</p>

                    <button type="button" className="card-link btn btn-link " data-toggle="modal" data-target={"#Z"+this.props.ID} style={{marginRight: "20px"}} onClick={this.handleClick}><i className="far fa-newspaper" style={{fontSize: "1.9rem"}}></i></button>


                    <div className="modal fade" id={"Z"+this.props.ID} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Article Analysis</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            {this.state.init}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
// --END

export default ArticleCard;
