import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {EmployeeProvider} from "./Contexts/EmployeeContext/EmployeeContext";
import {OrdersProvider} from "./Contexts/active-orders-context/OrdersContext";

ReactDOM.render(<BrowserRouter>
    <EmployeeProvider>
        <OrdersProvider>
            <App/>
        </OrdersProvider>
    </EmployeeProvider>
</BrowserRouter>, document.getElementById('root'));
