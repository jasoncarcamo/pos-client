import React from "react";
import "./bottom.css";
import {Link} from "react-router-dom";

export default class Bottom extends React.Component{
    render(){

        return (
            <section id="bottom-section">
                <button><Link to="/admin/login" className="bottom-button">Admin</Link></button>
                <button><Link to="/employees" className="bottom-button">Employees</Link></button>        
                <button><Link to="/cart" className="bottom-button">Checkout</Link></button>
                <button><Link to="/" className="bottom-button">Name</Link></button>
            </section>
        )
    }
}