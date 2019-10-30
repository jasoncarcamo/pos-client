import React from "react";
import "./tabs.css";
import {Link} from "react-router-dom";

export default class Tab extends React.Component{
    render(){
        return (
            <section id="tabs-section">
                <button><Link to="/burgers">Burgers</Link></button>
                <button><Link to="/sides">Sides</Link></button>
                <button><Link to="/drinks">Drinks</Link></button>
                <button><Link to="/salads">Salads</Link></button>
                <button><Link to="/condiments">Condiments</Link></button>
            </section>
        );
    }
}