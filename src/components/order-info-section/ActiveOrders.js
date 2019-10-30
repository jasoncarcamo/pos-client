import React from "react";
import OrdersContext from "../../Contexts/active-orders-context/OrdersContext";
import "./active.css";
import {Link} from "react-router-dom"

export default class ActiveOrders extends React.Component{
    
    
    constructor(props){
        super(props);
        this.state = {
            orders: []
        };
    };

    componentDidMount(){
        this.getOrders(); 
    }

    static contextType = OrdersContext;

    getOrders = () => {
        const {activeOrders = []} = this.context;
        this.setState({ orders: activeOrders})
    }
    
    addOrder = ()=> {

    }

    renderOrders = () => {
        const orders = this.state.orders;
        const orderList = orders.map( (order, index) => {
            if(order.name === ""){
                order.name = "null";
            };

            return (
                <Link to={`/order/${index}`} key={index}>
                    <p key={index}>{order.name}</p>
                </Link>
            )
        })

        return orderList;
    };
    setView = (index) => {
        this.context.setView(index);
    }

    formatData = (data)=>{

        let formatData = data.split("");
        
        if(formatData[1] === "\"" && formatData[formatData.length - 2] === "\""){
            formatData.shift();
            formatData.pop();
            formatData.shift();
            formatData.pop();
        }

        for(let i = 0; i < formatData.length; i++){
            if(formatData[i] === ("\\")){
                formatData.splice(i, 1);                
            };

            if(formatData[i] === "}" && formatData[i + 1] === "\""){
                formatData.splice(i + 1, 1);
            }

            if(formatData[i] === "}" && formatData[i + 2] === "\""){
                formatData.splice(i + 2, 1);
            }
        };

        formatData = formatData.join("");
        formatData = "[" + formatData + "]";
        
        if(formatData === "[{}]"){
            return this.setState({ items: []});
        }
        
        formatData = JSON.parse(formatData);

        this.setState({ orders: formatData});

    }

    render(){

        return (
            <section className="active-order-section">
                {this.renderOrders()}
            </section>
        )
    }
}