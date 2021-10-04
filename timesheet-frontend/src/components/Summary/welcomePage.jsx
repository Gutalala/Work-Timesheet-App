import React, { Component } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom'

class WelcomePage extends Component {
    state = {
        "JWT": "",
        "ID": ""
    }


    loginButton = () => {
        return <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='http://localhost:3001';
                            }}
        > Log In</button>
    }

    render() { 
        return (
            <div>
                <Navbar>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
                        <Nav.Item>
                            <Link className="navbar-brand m-0" to="/">
                            <img src='https://www.linkpicture.com/q/Logo_BeaconFire.png' type="image" padding='10px' />
                            </Link>
                        </Nav.Item>
                    </nav>
                </Navbar>

            <div className="App">
                    <div>
                        <p>Welcome to BeaconFire Timesheet System</p>
                        <div>
                            <p>You Have Not { this.loginButton()} Yet</p>
                        </div>
                        
                        

                        
                    </div>
                    
            </div>
        </div>
         );
    }
}
 
export default WelcomePage;