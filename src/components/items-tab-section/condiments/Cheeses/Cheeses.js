import React from "react";

export default class Cheeses extends React.Component{
    renderCheeses = () => {
        const cheeses = ["American", "Swiss", "Gouda", "Cheedar"];
        cheeses.sort();

        const cheeseItem = cheeses.map( (cheese, index) => <li key={index}>{cheese}</li>);

        return cheeseItem;
    }
    
    render(){
        return this.renderCheeses();
    }
}