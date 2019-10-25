import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Link, Route} from "react-router-dom"
import Tabs from "./components/items-tab-section/Tabs";
import Middle from "./components/middle-section/Middle";
import OrderInfo from "./components/order-info-section/OrderInfo";
import Bottom from "./components/bottom-section/Bottom"

function App() {
  return (
    <section id="main">
      <Route path="/" component={Tabs}></Route>
      <Route path="/" component={Middle}></Route>
      <Route path="/" component={OrderInfo}></Route>
      <Route path="/" component={Bottom}></Route>
    </section>
  );
}

export default App;
