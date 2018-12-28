import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute.js";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import EditBook from "./components/edit-book/EditBook";
import ShowBooks from "./components/bookhome/ShowBooks";
import AddBook from "./components/add-credentials/AddBook";

// check for token
if (localStorage.getItem("x-auth-token")) {
  setAuthToken(localStorage.getItem("x-auth-token"));
  const decoded = jwt_decode(localStorage.getItem("x-auth-token"));

  // set user and its authentication
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) window.location.href = "/login";
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/book-list" component={ShowBooks} />

              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-book" component={AddBook} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-book/:id"
                  component={EditBook}
                />
              </Switch>
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
