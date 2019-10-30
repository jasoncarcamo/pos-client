import React from "react";
import "./login.css";

export default class AdminSignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            pin: "",
            error: ""
        }
    }

    handleId = (e) => {
        this.setState({ id: e.target.value});
    }

    handlePin = (e) => {
        this.setState({ pin: e.target.value});
    }

    handleAdmin = (e) => {
        e.preventDefault();
        fetch("https://morning-river-47424.herokuapp.com/api/auth", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({id: this.state.id, pin: this.state.pin})
        })
            .then( res => {

                if(!res.ok){
                    return res.json().then( e => Promise.reject(e));
                };

                return res.json();
            })
            .then( data => {
                console.log(data)
                if(!data.adminToken){
                    throw new Error("Unauthorized access");
                };
                
                window.localStorage.setItem("admin", data.adminToken);
            })
            .catch( err => this.setState({ error: err.error}));
    }
    render(){
        return (
            <section id="admin-login">
                <form onSubmit={this.handleAdmin}>
                    <fieldset>

                        <label htmlFor="admin-name">Id:</label>
                        <input id="admin-name" type="text" onChange={this.handleId} value={this.state.id}></input>

                        <label htmlFor="admin-pin">Pin:</label>
                        <input id="admin-pin" type="password" onChange={this.handlePin} value={this.state.pin}></input>
                        {this.state.error ? <p id="admin-error">{this.state.error}</p> : ""}
                        <button type="submit">Log In</button>
                    </fieldset>
                </form>
            </section>
        );
    }
}