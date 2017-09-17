import React, { Component } from 'react';
import login from './login';
import survey from './survey';
import fire from './fire';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

const storageKey = 'LOCAL_STORAGE';

class App extends Component {

	state = {
		uid: null
	}

  componentWillMount(){
    /* Set up auth listner */
	fire.auth().onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(fire.storageKey, user.uid);
        this.setState({uid: user.uid});
      } else {
        window.localStorage.removeItem(fire.storageKey);
        this.setState({uid: null});
      }
    });
  }
  
  render() {
    return (
	 <BrowserRouter>
		<Switch>
        <Route exact path='/' component={login} />
		<MatchWhenAuthorized pattern="survey" component={survey} />
		</Switch>
      </BrowserRouter>
    );
  }
}

const isAuthenticated = () => {
  return !!fire.auth().currentUser || !!localStorage.getItem(storageKey);
}

const MatchWhenAuthorized = ({component: Component, ...rest}) => (
		<Route {...rest} render={renderProps => (
		isAuthenticated ? (
		  <Component {...renderProps} />
		) : (
		  <Redirect to={ {
			pathname: '/login',
			state: {from: renderProps.location}
		  } } />
		)
	  )}/>
	)
export default App;