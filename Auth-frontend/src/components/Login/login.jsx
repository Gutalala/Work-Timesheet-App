import React, { Component } from "react";
import "./login.css";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import * as ApiService from '../../services/ApiService';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            userID: "",
            JWTToken: "",
            message: "",
            open: false,
        };
    }

    setUsername = event => {
        this.setState({
            username: event.target.value
        });
    };

    setPassword = event => {
        this.setState({
            password: event.target.value
        });
    };

    signIn = (loginInfo) => {
        console.log(loginInfo)
        ApiService.login(loginInfo).then((response) => {
                console.log("response")
            console.log(response)
            let id = response.data.profile_id;
            if (id) {
                let id = response.data.profile_id;
                let token = response.data.token;
                this.setState({
                    user : loginInfo.username,
                    userID: id,
                    JWTToken: token,
                    open: true,
                    message: "You have successfully Logged In!"
                });
                window.sessionStorage.setItem("user", this.state.username);
                window.sessionStorage.setItem("userID", this.state.userID);
                window.sessionStorage.setItem("JWTToken", this.state.JWTToken);
            } else {
                this.setState({
                    open: true,
                    message: response.data
                });
            }
            
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        });
        if (this.state.message === 'You have successfully Logged In!') {
            let token = window.sessionStorage.getItem("JWTToken")
            let id = window.sessionStorage.getItem("userID")
            window.location.href = "http://localhost:3000?JWT=" + token + "&ID=" + id;
        };
    };


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
                        <Nav.Item>Auth</Nav.Item>
                    </nav>
                </Navbar>

            <div className="App">
                <header className="App-header">
                    <div className="Login">
                        <TextField
                            variant="standard"
                            placeholder="Username"
                            margin="normal"
                            required
                            onChange={this.setUsername}
                            value={this.state.username}
                        />
                        <TextField
                            variant="standard"
                            placeholder="Password"
                            margin="normal"
                            required
                            type="password"
                            onChange={this.setPassword}
                            value={this.state.password}
                        />

                        <div className="Button">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.signIn({"username" : this.state.username, "password": this.state.password});
                                }}
                            >
                                Log In
                            </Button>
                                
                        </div>
                    </div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Sign In</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>
                </header>
            </div>
        </div>
        )
    }
}

export default LogIn;
