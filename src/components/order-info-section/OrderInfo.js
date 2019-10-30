import React from "react";
import "./order.css";
import OrderContext from "../../Contexts/active-orders-context/OrdersContext";
import {Route} from "react-router-dom";
import ActiveOrders from "./ActiveOrders";
import CurrentOrder from "./CurrentOrder";
import NewOrder from "./NewOrder";

export default class OrderInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            customer: 1,
            total: 0.00,
        }
    };

    componentDidMount(){  
    }

    static contextType = OrderContext;

    getOrders = () => {
        const {activeOrders = []} = this.context;
        
        this.setState({orders: activeOrders});
    }

    getTotal = () => {
        let {activeOrders = [], viewing} = this.context;
        let total = Number(this.state.total);

        if(viewing === null || viewing === ""){
            return total;
        }

        if(activeOrders.length >= 1){

            activeOrders.forEach( (order, index) => {

                if(index === Number(viewing) ){
                    order.orderitems.forEach( item => {
                        total += Number(item.price);
                    });
                }
            });
            return total;
        }
    }

    handleNewOrder = () => {
        this.props.history.push("/");
    }

    handleActiveOrders = () => {
        this.props.history.push("/active");
    }

    initiateOrderInstance = () => {
        this.context.endOrderInstance();
        this.componentDidMount();
        this.props.history.push("/");
    }

    render(){
        return (
            <section id="order-section">
                <p id="customer-counter">Customer: {this.state.customer}</p>
                <div id="orders">
                    <p onClick={this.handleNewOrder} onClick={this.initiateOrderInstance}>New order</p>
                    <p onClick={this.handleActiveOrders}>Active orders</p>
                </div>
                <Route path="/" component={NewOrder}></Route>
                <Route exact path="/order/:name" component={CurrentOrder}></Route>
                <Route exact path="/active" component={ActiveOrders}></Route>
                <p id="delete-option" onClick={this.getOrders}>Delete</p>
                <p id="total">${this.getTotal()}</p>
            </section>
        )
    }
}