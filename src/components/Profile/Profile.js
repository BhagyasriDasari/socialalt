import React, { Component } from "react";
import { AuthContext } from "../Auth/AuthContext";

class Profile extends Component {
  static contextType = AuthContext; // Set the context type to access AuthContext

  state = {
    user: null,
  };

  componentDidMount() {
    const { user } = this.context;
    this.setState({ user }); // Initialize user from context
  }

  handleLogout = () => {
    const { logout } = this.context;
    logout();
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <img src={user.photoURL} alt="Profile" />
        <h1>{user.displayName}</h1>
        <p>{user.email}</p>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Profile;
