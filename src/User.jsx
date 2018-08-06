import React, { Component } from 'react';
import {withRouter, Route, Switch, Link, Redirect} from 'react-router-dom';


// import PrivateRoute from './PrivateRoute';
const Backwood404 = () => <h1>404</h1>
const MainView = () => <h1>Main View</h1>
const Create = () => <h1>create</h1>
const BillingForm = () => <h1>Billing Form</h1>
const TripOpen = () => <h1>Trip open</h1>
const AccountForm = () => <h1>Account Form</h1>
const Archived = () => <h1>Archived</h1>
const NoUser = () => <h1>No User</h1>
const UserHasNoTrips = () => <h1>User Has No Trips</h1>

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
 <React.Fragment>
   console.log(isAuthenticated)
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  exact/>
  </React.Fragment>
);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasTrips: false,
      noUser: false,
      data: false
      }

  }
  componentWillMount() {
      if (this.state.data === false && this.props.isAuthenticated === false) {
        this.props.history.push(`/${this.props.match.params.user}/error/user-has-no-trips`)
      } else {
        this.setState({ hasTrips: true, data: true })
      }
      if (this.props.user !== this.props.match.params.user) {
        this.props.history.push(`/${this.props.match.params.user}/error/does-not-exist`)
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
          <PrivateRoute path="/:user/archived" component={Archived} isAuthenticated={Boolean(this.props.isAuthenticated)} exact/>
          <PrivateRoute path="/:user/create" component={Create} isAuthenticated={Boolean(this.props.isAuthenticated)}exact/>
          <PrivateRoute path="/:user/billing" component={BillingForm} isAuthenticated={Boolean(this.props.isAuthenticated)} exact/>
          <PrivateRoute path="/:user/settings" component={AccountForm} isAuthenticated={Boolean(this.props.isAuthenticated)} exact/>
          <Route path="/:user/trip/:slug" component={TripOpen} />
          <Route path='/:user/error/does-not-exist' component={NoUser}/>
          <Route path='/:user/error/user-has-no-trips' component={UserHasNoTrips} />
          <Route component={Backwood404} />
        </Switch>
      </div>
     );
  }
}
 
export default withRouter(User);