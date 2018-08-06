import React from 'react';
import {withRouter} from 'react-router-dom';

// const AuthButton = withRouter(
//   ({ history }) =>
//     fakeAuth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//           onClick={() => {
//             fakeAuth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     ) : (
//       <p>You are not logged in.</p>
//     )
// );

const AuthButton = (props, {history}) => {
  return (
    props.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            props.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
  )

}

export default withRouter(AuthButton)