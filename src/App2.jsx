import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";
import User from './User';
const Landing = () => <h1>Landing</h1>

const NoUser = () => <h1>No User</h1>
const UserHasNoTrips = () => <h1>User Has No Trips</h1>
const Poop = () => <h1>Poop</h1>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthenticated: false,
      user: 'ted@ted.com'
    }
    this.signout = this.signout.bind(this);
    this.authenticate = this.authenticate.bind(this)
  }

  signout() {
    console.log('signOut')
    this.setState({isAuthenticated: false});
    this.props.history.push("/")
   
  }
  authenticate() {
    console.log('signIn')
    this.setState({isAuthenticated: true});
    this.props.history.push(`/${this.state.user}`)
    
  }
  render() { 
    return ( 
     
        <div>
          
          <button onClick={this.authenticate}>Login</button> 
          <button onClick={this.signout}>signout </button>
         
            <Route path="/" component={Landing} exact/>
            <Route path='/:user' render={props => 
              <User {...props} 
                isAuthenticated={this.state.isAuthenticated}
                user={this.state.user}
              />} />
            
            <Route path='/404/does-not-exist' component={NoUser} exact/>
            <Route path='/404/user-has-no-trips' component={UserHasNoTrips} exact/>
         
        </div>
      
    );
  }
}




export default withRouter(App);