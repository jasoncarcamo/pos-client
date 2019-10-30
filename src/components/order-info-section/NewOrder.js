import React from "react";
import OrdersContext from "../../Contexts/active-orders-context/OrdersContext";

export default class NewOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentOrder: "",
            id: "",
            name: "",
            orderitems: ""
        };
    }

    componentDidMount(){
        this.handleCurrentOrder();
    }

    static contextType = OrdersContext;


    handleCurrentOrder = () => {
        const orders = this.context.activeOrders;

        const currentOrder = orders[this.context.viewing];
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
    /*renderOrders = () => {
        const orders = this.state.orders.map( (order, index) => {
            return(
                <ul className="current-orders" key={index}>
                    <li key={index}>
                        {order.name}
                        <p>{order.price}</p>
                    </li>
                </ul>
            )
        });

        return orders;

    }*/

    render(){
        this.handleCurrentOrder();
        return '';
    }
}