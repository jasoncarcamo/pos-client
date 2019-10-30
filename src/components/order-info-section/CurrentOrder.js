import React from "react";
import OrdersContext from "../../Contexts/active-orders-context/OrdersContext";
import "./current.css";

export default class CurrentOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            id: "",
            name: "",
        };
    }

    componentDidMount(){
        this.handleCurrentOrder();
    }

    static contextType = OrdersContext;


    handleCurrentOrder = () => {
        let id = this.props.location.pathname.split("/")[2];
        const orders = this.context.activeOrders;
        const currentOrder = orders[Number(id)];

        this.context.setView(Number(id));
        this.setState({ orders: currentOrder.orderitems});
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

        return formatData;

    }

    renderOrders = () => {
        if(!this.state.orders){
            return "";
        };

        const orders = this.state.orders.map( (order, index) => {
            return(
                <ul key={index} className="current-orders">
                    <li key={index}
                    onClick={()=> this.removeItem(index)}>
                        {order.name}
                        <p>$ {order.price}</p>
                    </li>
                </ul>
            )
        });

        return orders;

    }

    removeItem = (index)=>{
        this.context.removeItem(index);
        this.componentDidMount();
    }

    render(){

        return (
            <section id="current-order-items">
                {this.renderOrders()}
            </section>
        );
    }
}