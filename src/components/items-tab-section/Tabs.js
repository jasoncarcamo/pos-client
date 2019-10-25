import React from "react";
import "./tabs.css";
import {Link} from "react-router-dom";

export default class Tab extends React.Component{
    render(){
        return (
            <section id="tabs-section">
                <button><Link>Burgers</Link></button>
                <button><Link>Sides</Link></button>
                <button><Link>Drinks</Link></button>
                <button><Link>Salads</Link></button>
                <button><Link>Condiments</Link></button>
            </section>
        );
    }
}