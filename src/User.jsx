import React, { Component } from 'react';
import {withRouter, Route, Switch, Link} from 'react-router-dom';


// import PrivateRoute from './PrivateRoute';
const Backwood404 = () => <h1>404</h1>
const MainView = () => <h1>Main View</h1>
const Create = () => <h1>create</h1>
const BillingForm = () => <h1>Billing Form</h1>
const TripOpen = () => <h1>Trip open</h1>
const AccountForm = () => <h1>Account Form</h1>
const Archived = () => <h1>Archived</h1>

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasTrips: true,
      noUser: false,
      data: true
      }

  }
  componentWillMount() {
      if (this.state.data === false && this.props.isAuthenticated === false) {
        this.props.history.push('/404/user-has-no-trips')
      } else {
        this.setState({ hasTrips: true, data: true })
      }
      if (this.props.user !== this.props.match.params.user) {
        this.props.history.push('/404/does-not-exist')
      }
   
  }
  render() { 
    return ( 
      <div>
        <h1>User</h1>
        <Link to={`/${this.props.match.params.user}/archived`}>Archived</Link>
        <Link to={`/${this.props.match.params.user}/create`}>Create</Link>
        <Link to={`/${this.props.match.params.user}/billing`}>Billing</Link>
        <Link to={`/${this.props.match.params.user}/settings`}>Account</Link>
        <Link to={`/${this.props.match.params.user}/trip/1`}>Trip open</Link>
        <Switch>
          <Route path="/:user" component={MainView} exact/>
          <Route path="/:user/archived" component={Archived}  exact/>
          <Route path="/:user/create" component={Create} exact/>
          <Route path="/:user/billing" component={BillingForm} exact/>
          <Route path="/:user/settings" component={AccountForm} exact/>
          <Route path="/:user/trip/:slug" component={TripOpen} exact/>
          <Route component={Backwood404} />
        </Switch>
      </div>
     );
  }
}
 
export default withRouter(User);