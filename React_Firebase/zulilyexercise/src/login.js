import React, { Component } from 'react';
import fire from './fire';
import {
  Redirect
} from 'react-router-dom'

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.setState({redirectToReferrer: true});
    });
  }

  render() {
    const {from} = this.props.location.state || '/';
    const {redirectToReferrer} = this.state;

    return (
      <section>
        {redirectToReferrer && (
          <Redirect to={from || '/survey'}/>
        )}
        {from && (
          <p></p>
        )}
	<div className="container mt-20">
    <div className="row">
	
		<div className="col-sm-3 col-sm-offset-3">
		<div className="alert alert-warning" role="alert">Please log in to continue</div>
			<form onSubmit={this.handleSubmit} method="POST">
			    <div className="form-group">
			      <label className="control-label" htmlFor="email">Email</label>
			        <input type="email" id="email" name="email" placeholder="user(#)@test.com" className="form-control" required value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
			    </div>
			    <div className="form-group">
			      <label htmlFor="password">Password</label>
			        <input type="password" id="password" name="password" placeholder="Password(#)" className="form-control" required value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
			    </div>
			    <div className="form-group">
			        <button className="btn btn-primary">Login</button>
			    </div>
			</form>
		</div>
	</div>
</div>
	
      </section>
    );
  }
}
export default Login;