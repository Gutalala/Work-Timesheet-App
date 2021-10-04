
import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, Redirect } from "react-router-dom";



class NavBar extends Component  {

  logout = () => {
    console.log("remove")
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("userID");

  }

  render() {
    return (
      <Navbar>
        <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
          <Nav.Item>
            <Link className="navbar-brand m-0" to="/summary">
              <img src='https://www.linkpicture.com/q/Logo_BeaconFire.png' type="image" padding='10px' />
            </Link>
          </Nav.Item>
          

          <Nav.Item>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-item nav-link" to="/summary">
                  Summary
                </NavLink>
                <NavLink className="nav-item nav-link" to="/timesheet">
                  Timesheet
                </NavLink>
                <NavLink className="nav-item nav-link" to="/profile">
                  Profile
                </NavLink>
              </div>
            </div>
            
          </Nav.Item>

          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>

          
          <Nav.Item>
            <button href = "/login" className="btn btn-outline-secondary" onClick={ this.logout}> 
              <Link to="/login" style={{ textDecoration: 'none', color: '#807c7c' }}>LOG OUT AS { window.sessionStorage.getItem("user")}</Link>
            </button>
          </Nav.Item>
          
          
          <Nav.Item></Nav.Item>
        </nav>
      </Navbar>
      
    )
  }
}
  

export default NavBar;
