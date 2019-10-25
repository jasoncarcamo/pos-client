import React from "react";
import "./condiment.css";

export default class Condiments extends React.Component{

    renderCondiments = () => {
        const condiments = ["Ketchup", "Bbq", "Mayo", "Cheese", "Lettuce", "Tomatoes", "Onions"];

        condiments.forEach( (condiment, index) => {
            
            condiments[index] = <p>{condiment}</p>;
            
        });

        return condiments;
    }

    render(){
        
        return(
            <section id="condiments">
                {this.renderCondiments()}
            </section>
        )
    }
} 