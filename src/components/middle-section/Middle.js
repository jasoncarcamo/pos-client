import React from "react";
import "./middle.css";
import {Route} from "react-router-dom";
import Condiments from "./condiments/Condiments";

export default class Middle extends React.Component{
    render(){
        return (
            <section id="middle-section">
                <section id="condiment-option">
                    <p>Add</p>
                    <p>Extra</p>
                    <p>No</p>
                </section>
                <Route exact path="/condiments" component={Condiments}></Route>
            </section>
        );
    }
}