import React from "react";
import "./order.css";

export default class OrderInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customer: 1,
            total: 0.00
        }
    };

    render(){
        return (
            <section id="order-section">
                <p id="customer-counter">Customer: {this.state.customer}</p>
                <div id="orders">
                    <p>New order</p>
                    <p>Active orders</p>
                </div>
                <p id="delete-option">Delete</p>
                <p id="total">${this.state.total}</p>
            </section>
        )
    }
}