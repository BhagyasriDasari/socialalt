import React, { Component } from "react";
import { AuthContext } from "./AuthContext";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../services/firebase";

class Login extends Component {
  static contextType = AuthContext; // Access AuthContext directly in a class component

  handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  render() {
    const { user } = this.context;

    return (
      <div style={{ textAlign: "center" }}>
        {user ? (
          <h2>Welcome, {user.displayName}</h2>
        ) : (
          <>
            <h2>Login with Google</h2>
            <button onClick={this.handleLogin}>Login</button>
          </>
        )}
      </div>
    );
  }
}

export default Login;
