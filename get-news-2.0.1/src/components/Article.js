import React, { Component } from 'react';
import $ from "jquery";
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
    };

    handleClick(e){
        e.preventDefault();
//        $(this).find('.modal-title').text('New message to ' )
        this.setState({
            init: <Analysis dataURL={this.props.url} chartID={"C"+this.props.ID}/>,
        });
    };

    render(){
        return(
            <div className="col-md-6" style={{marginBottom: "50px"}}>
                <div className="card shadow" style={{width: "auto", padding: "0", borderRadius: "10px", border: "none"}}>
                <img className="card-img-top" style={{borderRadius: "10px 10px 0px 0px"}} src={this.props.img || "https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640"} alt="ariticle "/>
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
// --END

export default ArticleCard;
