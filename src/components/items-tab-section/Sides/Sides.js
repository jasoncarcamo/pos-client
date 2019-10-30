import React from "react";
import SidesService from "./SidesService";
import OrderContext from "../../../Contexts/active-orders-context/OrdersContext";
import "./sides.css";

export default class Sides extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sides: [],
            error: ""
        };
    };

    componentDidMount(){
        this.getSides();
    }

    static contextType = OrderContext;

    getSides = () => {
        SidesService.getSides()
            .then( sides => {

                const allSides = sides.filter( side => side.menuid === 2 ? side : null);
                this.setState({ sides: allSides});
            })
            .catch(err=> this.setState({ error: err.error}));
    }

    renderSides = () => {
        const allSides = this.state.sides;
        const sides = allSides.map( (side, index) => {
            return (
                <ul className="sides-container" key={index}>
                    <li 
                    key={index}
                    onClick={()=> this.handleLiHandler(index)}>
                        {side.name}
                        <p>${side.price}</p>
                    </li>

                </ul>
            )
        })

        return sides;
    }

    handleLiHandler = (location) =>{
        const orders = this.context.activeOrders;
        const orderLocation = orders.length;
        this.context.addOrder(this.state.sides[location]);
        this.props.history.push(`/sides`);
    }
    
    render(){
        return this.renderSides();
    }
}