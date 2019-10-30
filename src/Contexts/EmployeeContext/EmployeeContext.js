import React from "react";
import EmployeeService from "./EmployeeService";

const EmployeeContext = React.createContext({
    employees: [],
    updateEmployees: ()=>{}
})

export default EmployeeContext;

export class EmployeeProvider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: []
        };
    };

    componentDidMount(){
        this.getEmployees();
    }

    getEmployees = () => {
        EmployeeService.getEmployees()
            .then( employees => {
                this.setState({employees: employees.employees})
            });
    }

    formatData = (data)=>{

        let formatData = data.split("");
        
        if(formatData[1] === "\"" && formatData[formatData.length - 2] === "\""){
            formatData.shift();
            formatData.pop();
            formatData.shift();
            formatData.pop();
        }

        for(let i = 0; i < formatData.length; i++){
            if(formatData[i] === ("\\")){
                formatData.splice(i, 1);                
            };

            if(formatData[i] === "}" && formatData[i + 1] === "\""){
                formatData.splice(i + 1, 1);
            }

            if(formatData[i] === "}" && formatData[i + 2] === "\""){
                formatData.splice(i + 2, 1);
            }
        };

        formatData = formatData.join("");
        formatData = "[" + formatData + "]";
        
        if(formatData === "[{}]"){
            return this.setState({ items: []});
        }
        
        formatData = JSON.parse(formatData);

        this.setState({ employees: formatData});

    }

    updateEmployees = () => {
        this.componentDidMount();
    }

    render(){
        const value = {
            employees: this.state.employees,
            updateEmployees: this.updateEmployees
        };


        return (
            <EmployeeContext.Provider value={value}>                
                {this.props.children}
            </EmployeeContext.Provider>
        );
    }
}