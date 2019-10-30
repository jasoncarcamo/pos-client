import React from "react";
import "./bottom.css";
import {Link} from "react-router-dom";

export default class Bottom extends React.Component{
    render(){

        return (
            <section id="bottom-section">
                <Link to="/admin/login" className="bottom-button"><button>Admin</button></Link>
                <Link to="/employees" className="bottom-button"><button>Employees</button></Link>
                <Link to="/cart" className="bottom-button"><button>Checkout</button></Link>
                <Link to="/" className="bottom-button"><button>Name</button></Link>
            </section>
        )
    }
}