import React from "react";


export default class Sauces extends React.Component{
    renderSauces = () => {
        const sauces = ["Ketchup", "Mustard", "Bbq", "Mayo"];
        sauces.sort();

        const sauceItem = sauces.map( (sauce, index) => <li key={index}>{sauce}</li>);

        return sauceItem;
    }

    render(){
        return this.renderSauces();
    }
}