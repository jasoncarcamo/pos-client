import React from "react";
import "./condiment.css";
import Sauces from "./Sauces/Sauces";
import Cheeses from "./Cheeses/Cheeses";
import Vegetables from "./Vegetable/Vegetable";

export default class Condiments extends React.Component{

    componentDidMount(){
        //this.showCondiments();
    }

    /*showCondiments = () =>{
        console.log("Working")
        const containers = document.querySelectorAll("#condiment-categories > ul > p");
        console.log(containers);
        Array.from(containers).forEach( container => {
            container.addEventListener("click", (e)=>{

                const containerLi = document.querySelectorAll(`.${container.parentNode.className} > li`);
                console.log("clicked")
                Array.from(containerLi).forEach( li => {
                    li.classList.toggle("condiment-li");
                });
            });
        });
    }*/

    render(){
        
        return(
            <section id="condiments">

                <section id="condiment-option">
                    <p>Add</p>
                    <p>Extra</p>
                    <p>No</p>
                </section>

                <section id="condiment-categories">

                    <ul className="sauce-container">
                        <p>Sauce</p>
                        <Sauces></Sauces>
                    </ul>

                    <ul className="cheese-container">
                        <p>Cheese</p>
                        <Cheeses></Cheeses>
                    </ul>

                    <ul className="vegetable-container">
                        <p>Vegetables</p>
                        <Vegetables></Vegetables>
                    </ul>
                </section>
            </section>
        )
    }
} 