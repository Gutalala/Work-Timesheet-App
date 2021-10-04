import React, { Component } from "react";
import './App.css';
import TimeSheetHome from './components/TimeSheetHome/TimeSheetHome';
import Profile from './components/Profile/profile';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Route, Redirect, Switch} from "react-router-dom";
import { goLogin } from './services/ApiService'
import WelcomePage from "./components/Summary/welcomePage";
import Dashboard from "./components/Summary/Dashboard";


class App extends Component {
  constructor(props) {
    super(props)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const from = urlParams.get('from')
    console.log("from "+from)
    if (from === "auth") {
      const JWT = urlParams.get('JWT')
      const ID = urlParams.get('ID')
      window.sessionStorage.setItem("JWT", JWT)
      window.sessionStorage.setItem("userID", ID)
      console.log("get JWT  ")
      console.log(JWT)
      console.log(ID)
    } 
  }

  state = {
    user : window.sessionStorage.getItem("user")
  }


  checkLogIn = () => {
    let curJWT = window.sessionStorage.getItem("JWT")
    let curID = window.sessionStorage.getItem("userID")
    console.log("current  JWT " + curJWT)
    console.log("current ID   " + curID)
    console.log(typeof curJWT)
    if (!curJWT &&!curID) {
        console.log("no user")
        return WelcomePage
    }
        
    console.log("yes user")
    
    return Dashboard
  }

  render() {
    return (
      <div>
        <div>
          <Switch>
            {/* <Route exact path={["/", "/login"]} component={LogIn} /> */}
            {/* {!this.state.user && goLogin()} */}
            {/* {window.sessionStorage.getItem("userID") && } */}
            
            <Route path="/" component={this.checkLogIn()} />
            <Route path="/beaconfire" component={ WelcomePage} />
{/* 
            {
              window.sessionStorage.getItem("userID") ? (
                  <Route>
                    <Dashboard></Dashboard>
                  </Route>
              ): (
                  <WelcomePage/>
              )
            } */}

           
            
          </Switch>
        </div>
      </div>
    

      
    );
  }

}

export default App;

