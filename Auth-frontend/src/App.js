import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Route, Redirect, Switch, useParams} from "react-router-dom";
import NotFound from "./components/Summary/notFound";
import LogIn from "./components/Login/login";


class App extends Component {
  state = {
    user : window.sessionStorage.getItem("user")
  }

  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route path={["/", "/login"]} component={LogIn} />
            {!this.state.user && <Redirect to='/login' />}
            <Route path="/not-found" Component={NotFound}/>
            <Redirect to="/not-found"/>
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;

