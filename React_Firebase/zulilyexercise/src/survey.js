import React, { Component } from 'react';
import * as Survey from 'survey-react';
import fire from './fire';
import { withRouter } from 'react-router';
import './bootstrap.override.css';
import './surveyJSON.js';

class SurveyPage extends Component {
   
   constructor(props) {
	//Set up survey   
	Survey.Survey.cssType = "bootstrap";
	Survey.defaultBootstrapCss.navigationButton = "btn btn-default";
    super(props);
	this.surveyCss =  {
    "row": "questionRow",
	"pageTitle": "pageTitle",
	"row": "table-responsive",
	"question": {
					"title": "questionTitle"
				},
	"panel": 	{
					"title": "panelTitle",
					"container": "panelContainer"
				},	
	"matrix": 	{
					"root": "table"
				},				
	};
	this.surveyModel = new Survey.Model(window.surveyJSON);
	this.surveyModel.showProgressBar = 'bottom';
	this.surveyModel.completedHtml = '<div class="alert alert-success" role="alert">Thank you for completing the survey!</div>';
    this.state = {
		data: null
	}	
  }
  
  componentWillMount(){
	  //Set up auth listner
	  fire.auth().onAuthStateChanged(user => {
			  if (user) {
				var _this = this;
				fire.database().ref('/surveys/' + user.uid).once('value').then(function(survey) {					
					_this.surveyModel.data = JSON.parse( JSON.stringify(survey.val()));	
					_this.surveyModel.currentPageNo = _this.getPageNumberFromData(_this.surveyModel.data);					
					_this.setState({data:survey.val()});					
				});
			  } 
			  else {
				this.props.history.push('/');
			  }
		});
  }
  
  //Iterates through results to determine the last completed page
  getPageNumberFromData(data) {
	  var pageNum = 0;
	  var maxPage = 0;
	  for(var key in data)
	  {
		  var page = this.surveyModel.getPageByQuestion(this.surveyModel.getQuestionByName(key));
		  if(page != null)
		  {
			  pageNum = page.visibleIndex+1;
			  if(pageNum > maxPage) {
				  maxPage =  pageNum;
			  }
		  }
	  }
	  return maxPage;
  }
  
  saveSurvey(survey){
    fire.database().ref('surveys/' +fire.auth().currentUser.uid).set( JSON.parse( JSON.stringify(survey.data)) );
  }
  
  render() {
		return (<div className="container mt-20">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-2">< Survey.Survey model ={this.surveyModel} css={this.surveyCss} onCurrentPageChanged={this.saveSurvey} onComplete={this.saveSurvey} />
					</div>
				</div>
			  </div>);
  }
}
export default withRouter(SurveyPage);