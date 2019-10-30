import React from "react";
import "./tabs.css";
import {Link} from "react-router-dom";

export default class Tab extends React.Component{
    render(){
        return (
            <section id="tabs-section">
                <Link to="/burgers" className="tabs-buttons"><button>Burgers</button></Link>
                <Link to="/sides" className="tabs-buttons"><button>Sides</button></Link>
                <Link to="/drinks" className="tabs-buttons"><button>Drinks</button></Link>
                <Link to="/salads" className="tabs-buttons"><button>Salads</button></Link>
                <Link to="/condiments" className="tabs-buttons"><button>Condiments</button></Link>
            </section>
        );
    }
}