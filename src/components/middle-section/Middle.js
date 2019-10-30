import React from "react";
import "./middle.css";
import {Route} from "react-router-dom";
import Condiments from "../items-tab-section/condiments/Condiments";
import AdminSignIn from "../items-tab-section/Admin/AdminSignIn";
import Employees from "../items-tab-section/Employees/Employees";
import Burgers from "../items-tab-section/Burgers/Burgers";
import Sides from "../items-tab-section/Sides/Sides";
import Drinks from "../items-tab-section/Drinks/Drinks";
import Salads from "../items-tab-section/Salads/Salads";

//This component is ment to display the bottom section options
export default class Middle extends React.Component{
    render(){
        return (
            <section id="middle-section">
                <Route exact path="/">
                    <h2>Smile and Greet!</h2>
                </Route>
                <Route exact path="/burgers" component={Burgers}></Route>
                <Route exact path="/admin/login" component={AdminSignIn}></Route>
                <Route exact path="/Employees" component={Employees}></Route>
                <Route exact path="/condiments" component={Condiments}></Route>
                <Route exact path="/sides" component={Sides}></Route>
                <Route exact path="/drinks" component={Drinks}></Route>
                <Route exact path="/salads" component={Salads}></Route>
            </section>
        );
    }
}