import React from "react";
import BurgerService  from "./BurgerService";
import "./burger.css";
import OrderContext from "../../../Contexts/active-orders-context/OrdersContext";

export default class Burgers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            burgers: [],
            error: ""
        }
    }

    componentDidMount(){
        BurgerService.getBurgers()
            .then( items => {
                const burgers = items.filter( item => item.menuid === 1 );
                this.setState({ burgers});
            })
            .catch(err=> this.setState({ error: err.error}))
    }

    static contextType = OrderContext;


    renderBurgers = () => {
        const burgers = this.state.burgers;

        const burgerList = burgers.map( (burger, index) => {

            return (
                <ul 
                className="burger-item-container" 
                name={burger.name}
                key={index}
                >
                    <li 
                    key={index} 
                    name={burger.name}
                    onClick={() => this.handleLiHandler(index)}>

                        {burger.name}

                        <p 
                        key={index} 
                        name={burger.name}>${burger.price}</p>
                    </li>
                </ul>
            )
        });

        return burgerList;
    }

    handleLiHandler = (location) =>{
        const orders = this.context.activeOrders;
        const orderLocation = orders.length;
        
        this.context.addOrder(this.state.burgers[location]);
        this.props.history.push(`/burgers`);
    }

    render(){
        return this.renderBurgers();
    }
}