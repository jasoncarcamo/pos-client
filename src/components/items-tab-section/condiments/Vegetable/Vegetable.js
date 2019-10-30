import React from "react";

export default class Vegetables extends React.Component{
    renderVegetables = () =>{
        const vegetables = ["Lettece", "Tomatoes", "Onions", "Pickles", ];
        vegetables.sort();

        const vegetableItem = vegetables.map( (vegetable, index) => <li key={index}>{vegetable}</li>);

        return vegetableItem;
    }
    render(){
        return this.renderVegetables();
    }
}