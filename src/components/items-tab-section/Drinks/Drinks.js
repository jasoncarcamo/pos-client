import React from "react";
import DrinkService from "./DrinkService";
import OrderContext from "../../../Contexts/active-orders-context/OrdersContext";
import "./drinks.css";

export default class Drinks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            drinks : []
        }
    }

    componentDidMount(){
        this.getDrinks();
    }

    static contextType = OrderContext;

    getDrinks = () => {
        DrinkService.getDrinks()
            .then( drinks => {
                const getDrinks = drinks.filter( drink => drink.menuid === 3 ? drink : null );
                this.setState({drinks: getDrinks});
            })
            .catch(err => this.setState({error: err.error}))
    }

    renderDrinks = ()=> {
        const allDrinks = this.state.drinks;
        const drinks = allDrinks.map( (drink, index) => {
            return (
                <ul className="drinks-container" key={index}>
                    <li 
                    key={index}
                    onClick={() => this.handleLiHandler(index)}>
                        {drink.name}
                        <p>${drink.price}</p>
                    </li>
                </ul>
            );
        });

        return drinks;
    }

    handleLiHandler = (location) =>{
        const orders = this.context.activeOrders;

        this.context.addOrder(this.state.drinks[location]);
        this.props.history.push(`/drinks`);
    }

    render(){
        return this.renderDrinks();
    }
}