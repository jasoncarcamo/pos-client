import React from "react";
import SaladService from "./SaladService";
import OrderContext from "../../../Contexts/active-orders-context/OrdersContext"
import "./salads.css";

export default class Salads extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            salads: [],
            error: ""
        }
    }

    componentDidMount(){
        this.getSalads();
    }

    static contextType = OrderContext;

    getSalads = () => {
        SaladService.getSalads()
            .then( salads => {
                const allSalads = salads.filter( salad => salad.menuid === 4 ? salad : null);
                this.setState({ salads: allSalads});
            })
            .catch( err => this.setState({error: err.error}))
    }

    renderSalads = () => {
        const allSalads = this.state.salads;
        const salads = allSalads.map( (salad, index) => {
            return (
                <ul className="salads-container" key={index}>
                    <li 
                    key={index}
                    onClick={() => this.handleLiHandler(index)}>
                        {salad.name}
                        <p>${salad.price}</p>
                    </li>
                </ul>
            );
        });

        return salads;
    }

    handleLiHandler = (location) =>{
        const orders = this.context.activeOrders;
        this.context.addOrder(this.state.salads[location]);
        this.props.history.push(`/salads`);
    }

    render(){
        return this.renderSalads();
    }
}