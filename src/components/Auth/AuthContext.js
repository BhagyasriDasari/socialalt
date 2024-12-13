import React, { createContext, Component } from "react";
import { auth } from "../../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    user: null,
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      this.setState({ user: currentUser });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  logout = async () => {
    await signOut(auth);
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider value={{ user, logout: this.logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
}
