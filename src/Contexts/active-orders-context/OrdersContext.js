import React from "react";
import OrdersService from "./OrdersService";

const OrdersContext = React.createContext({
    customerInstance: false,
    activeOrders: [],
    addOrder: ()=>{},
    updateOrder:()=>{},
    removeItem: ()=>{},
    initiateOrderInstance:()=>{},
    endOrderInstance:()=>{},
    viewing: ""
});

export default OrdersContext;

export class OrdersProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customerInstance: false,
            activeOrders: [],
            viewing: ""
        };
    };

    componentDidMount(){
        this.getOrders();
    };

    initiateOrderInstance = () => {
        this.setState({ customerInstance: true});
    }

    endOrderInstance = () => {
        this.setState({ customerInstance: false, viewing: null});
    }

    getOrders = () => {
        OrdersService.getOrders()
            .then( orders => {
                const activeOrders = orders.data.map( order => !order.complete ? order : null)
                
                activeOrders.forEach( order => {
                    
                    order.orderitems = this.formatData(order.orderitems);
                });

                this.setState({ activeOrders, orderNum: activeOrders.length});
            });
    };

    addOrder = (order, id, name = "") => {
        
        const orders = this.state.activeOrders;
        const newCustomerInstance = {
            name, 
            orderitems: []
        };

        if(!this.state.customerInstance){
            newCustomerInstance.orderitems.push(order);

            OrdersService.addOrder(newCustomerInstance)
                .then( addedOrderInstance => {

                    this.setView(orders.length);

                    return this.getOrders();
                })
                .catch( err => this.setState({ err: err.error}));
        } else if( this.state.customerInstance && this.state.viewing !== ""){
            
            orders[this.state.viewing].orderitems.push(order);

            OrdersService.updateOrder(orders[this.state.viewing].id, orders[this.state.viewing].orderitems)
                .then( res => {
                    this.getOrders();
                })
        }
    }

    updateOrder = () => {
        this.componentDidMount();
    }


    formatData = (data)=>{

        let formatData = data.split("");
        
        if(formatData[1] === "\"" && formatData[formatData.length - 2] === "\""){
            formatData.shift();
            formatData.pop();
            formatData.shift();
            formatData.pop();
        };

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

    setView = (id) => {
        this.setState({customerInstance: true, viewing: Number(id)});
    }

    removeView = () => {
        this.setState({customerInstance: false, viewing: null});
    }
    
    removeItem = (itemLocation) => {
        let orders = this.state.activeOrders;

        orders[this.state.viewing].orderitems.splice(itemLocation, 1);

        this.componentDidMount();

        if(orders[this.state.viewing].orderitems.length === 0){
            return OrdersService.deleteOrder(orders[this.state.viewing].id)
                .then( res=> {
                    return this.getOrders();
                })
                .catch(err=> this.setState({error: err.error}));
        }

        OrdersService.updateOrder(orders[this.state.viewing].id, orders[this.state.viewing].orderitems)
                .then( res => {
                    this.getOrders();
                    
                })
    }

    render(){
        const value = {
            customerInstance: this.state.customerInstance,
            orderNum: this.state.orderNum,
            activeOrders: this.state.activeOrders,
            addOrder: this.addOrder,
            updateOrder: this.updateOrder,
            initiateOrderInstance: this.initiateOrderInstance,
            endOrderInstance: this.endOrderInstance,
            viewing: this.state.viewing,
            setView: this.setView,
            removeView: this.removeView,
            removeItem: this.removeItem
        };

        return (
            <OrdersContext.Provider value={value}>
                {this.props.children}
            </OrdersContext.Provider>
        );
    }

}