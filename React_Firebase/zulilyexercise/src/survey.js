import React, { Component } from 'react';
import * as Survey from 'survey-react';
import fire from './fire';
import { withRouter } from 'react-router';

class SurveyPage extends Component {
   
   constructor(props) {
	   
	Survey.Survey.cssType = "bootstrap";
	Survey.defaultBootstrapCss.navigationButton = "btn btn-default";
    super(props);
	this.surveyModel = new Survey.Model({ cookieName: "SurveyCompleted", focusFirstQuestionAutomatic: true, title: "Tell us, what technologies do you use?", pages: [
					  { name:"page1", questions: [ 
						  { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
						  { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visibleIf: "{frameworkUsing} = 'Yes'" }
					   ]},
					  { name: "page2", questions: [
						{ type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
						{ type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" } ] },
					  { name: "page3",questions: [
						{ type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
					 ]
					});
	this.surveyModel.showProgressBar = 'bottom';
	this.surveyModel.completedHtml = '<div class="alert alert-success" role="alert">Thank you for completing the survey!</div>';
    this.state = {
		data: null
	}	
  }
  
  componentWillMount(){
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
  
  getPageNumberFromData(data) {
	  var pageNum = 0;
	  var page = this.surveyModel.getPageByQuestion(this.surveyModel.getQuestionByName(Object.keys(data).slice(-1)[0]));
	  if(page != null)
	  {
		  pageNum = page.visibleIndex+1;
	  }
	  return pageNum;
  }
  
  saveSurvey(survey){
    fire.database().ref('surveys/' +fire.auth().currentUser.uid).set( JSON.parse( JSON.stringify(survey.data)) );
  }
  
  render() {
		return (<div className="container mt-20">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-2">< Survey.Survey model ={this.surveyModel} onCurrentPageChanged={this.saveSurvey} onComplete={this.saveSurvey} />
					</div>
				</div>
			  </div>);
  }
}
export default withRouter(SurveyPage);