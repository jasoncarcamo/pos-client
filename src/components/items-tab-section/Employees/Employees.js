import React from "react";
import "./employee.css";
import EmployeeContext from "../../../Contexts/EmployeeContext/EmployeeContext";

export default class Employees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            pin: "",
            clock: false,
            break: false,
            clocked: "",
            onBreak: false,
            message: "",
            error: ""
        }
    }

    componentDidMount(){
        this.setState({
            id: "",
            pin: "",
            clock: false,
            break: false,
            clocked: "",
            onBreak: "",
            message: "",
            todaysDate: new Date(),
            error: "",
        });
        
    }

    static contextType = EmployeeContext;


    handleId = (e) => {
        this.setState({id: e.target.value});
    }

    handlePin = (e) => {
        this.setState({ pin: e.target.value});
    }

    //CLock in options begin here
    handleClockInButtons = ()=>{
        if(this.state.clock && !this.state.break){
            return (
                <div>

                    <div>
                        <button type="submit" name="In" value="true" onClick={this.handleClockOption}>In</button>
                        <button type="submit" name="Out" value="false" onClick={this.handleClockOption}>Out</button>
                    </div>

                    <button className="employee-cancel" type="button" onClick={this.handleCancel}>Cancel</button>
                </div>
                );
        } else if(!this.state.break && !this.state.clock){
            return <button type="submit" onClick={this.handleClock}>Clock</button>
        };
    }

    updateEmployees = () => {
        this.context.updateEmployees();
    }

    handleClock = ()=>{
        this.setState({ clock: true, break: false})
    }

    handleClockIn = (e) => {

        e.preventDefault();

        const {employees = []} = this.context;
        let isClockedIn;
        let onBreak;
        let options;
        let message;
        let timesheetOption = {
            method: "",
            body: {

            },
            id: ""
        };

        if(this.state.clock){
            options = { isclockedin: this.state.clock}
            message = `Clocked ${this.state.clocked}`;
        } else if(this.state.break){
            timesheetOption.method = "PATCH"
            options = { onbreak: this.state.break};
            message = `${this.state.onBreak} Break`;
        };

        this.setState({message});

        if(message === "Clocked In"){
            
            timesheetOption.method = "POST";

            timesheetOption.body = {
                shift_start: new Date(),
                date: this.state.todaysDate,
                employee_id: this.state.id
            };

            //Check to see if employee is clocked in
            isClockedIn = employees.find( employee => {
                if(employee.id === Number(this.state.id) && employee.isclockedin){
                    return true;
                } else{
                    return false;
                };
            })

            if(isClockedIn){
                this.context.updateEmployees();
                this.componentDidMount();
                return this.setState({ error: "Employee is clocked in already."});
            }
            
        } else if( message === "Clocked Out"){
            
            timesheetOption.method = "PATCH";

            timesheetOption.body = {
                shift_end: new Date(),
            }

            timesheetOption.id = "/" + this.state.id;

            //Check to see if employee is clocked in
            isClockedIn = employees.find( employee => {
                if(employee.id === Number(this.state.id) && employee.isclockedin){
                    return true;
                } else{
                    return false;
                };
            })

            if(!isClockedIn){
                this.context.updateEmployees();
                this.componentDidMount();
                return this.setState({ error: "Employee is not clocked in."});
            }
        };


        if(message === "On Break"){
            
            timesheetOption.method = "PATCH";

            timesheetOption.body = {
                onbreak: new Date()
            };

            timesheetOption.id = "/" + this.state.id;

            onBreak = employees.find( employee => {
                if(employee.id === Number(this.state.id) && !employee.isclockedin && !employee.onbreak ){
                    return true;
                } else{
                    return false;
                };
            });

            if(onBreak){
                this.context.updateEmployees();
                this.componentDidMount();
                return this.setState({ error: "Employee is not clocked in."});
            };

            onBreak = employees.find( employee => {
                if(employee.id === Number(this.state.id) && employee.isclockedin && employee.onbreak ){
                    return true;
                } else{
                    return false;
                };
            })

            if(onBreak){
                this.context.updateEmployees();
                this.componentDidMount();
                return this.setState({ error: "Employee is on break already."});
            };


        } else if( message === "Off Break"){
            
            timesheetOption.method = "PATCH";

            timesheetOption.body = {
                offbreak: new Date(),
            };

            timesheetOption.id = "/" + this.state.id;

            onBreak = employees.find( employee => {
                if(employee.id === Number(this.state.id) && employee.onbreak){
                    return true;
                } else{
                    return false;
                };
            })

            if(!onBreak){
                this.context.updateEmployees();
                this.componentDidMount();
                return this.setState({ error: "Employee did not go on break."});
            }

        };

        const confirmSection = document.getElementById("clocked-in-confirm"); 

        Promise.all([
            fetch("http://localhost:8000/api/auth", {
                method: "POST", 
                headers:{
                    'content-type': "application/json"
                },
                body: JSON.stringify({id: this.state.id, pin: this.state.pin})
            }),
            fetch(`http://localhost:8000/api/employees/${this.state.id}`, {
                method: "PATCH",
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${window.localStorage.getItem("admin")}`
                },
                body: JSON.stringify(options)
            }),
            fetch(`http://localhost:8000/api/timesheets${timesheetOption.id}`, {
                method: timesheetOption.method,
                headers: {
                    'content-type': "application/json",
                    'authorization': `bearer ${window.localStorage.getItem("admin")}`
                },
                body: JSON.stringify(timesheetOption.body)
            })
    ])
        .then(([clockingRes, breakRes, timesheetRes])=> {

            if(!clockingRes.ok){
                return clockingRes.json().then(e => Promise.reject(e));
            };

            if(!breakRes.ok){
                return breakRes.json().then(e=> Promise.reject(e));
            };

            if(!timesheetRes.ok){
                return timesheetRes.json().then(e=> Promise.reject(e));
            };

            return Promise.all([clockingRes])
        })
        .then( data => {
            confirmSection.style.display = "block";
        })
        .catch( err => this.setState({error: err.error}));
    }

    handleClockOption = (e) => {
        this.setState({clock: e.target.value, clocked: e.target.name});
    }

    handleConfirmClocked = () => {
        const confirmSection = document.getElementById("clocked-in-confirm");

        confirmSection.style.display = " none";
        this.context.updateEmployees();
        this.componentDidMount();
    }

    handleCancel = () => {
        this.componentDidMount();
    }

    //Break options begins here

    handleBreakButtons = () => {
        if(this.state.break && !this.state.clock){
            return (
                <div>
                    <div>
                        <button type="submit" name="On" value="true" onClick={this.handleBreakOption}>On</button>
                        <button type="submit" name="Off" value="false" onClick={this.handleBreakOption}>Off</button>
                    </div>

                    <button className="employee-cancel" type="button" onClick={this.handleCancel}>Cancel</button>
                </div>
            )
        } else if( !this.state.break && !this.state.clock){
            return <button type="button" onClick={this.handleBreak}>Break</button>
        }
    }

    handleBreak = () => {
        this.setState({ 
            break: true,
            clock: false
        });
    }

    handleConfirmBreak = () => {
        const confirmSection = document.getElementById("break-confirm");

        confirmSection.style.display = " none";
        this.componentDidMount();
    }

    handleBreakOption = (e) => {
        this.setState({ break: e.target.value, onBreak: e.target.name});
    }

    handlOffBreak = () =>{
        this.setState({
            break: false,
            clock: false
        });
    }

    render(){
        return (
            <section id="employee-section">
                <div id="clocked-in-confirm">
                    <h3>{this.state.message}</h3>
                    <button type="button" className="confirm-button" onClick={this.handleConfirmClocked}>Ok</button>
                </div>
                
                <form onSubmit={this.handleClockIn}>
                    <fieldset>
                        <label htmlFor="employee-number">Id:</label>
                        <input id="employee-number" type="text" onChange={this.handleId} value={this.state.id}></input>

                        <label htmlFor="employee-pin">Pin:</label>
                        <input id="employee-pin" type="password" onChange={this.handlePin} value={this.state.pin}></input>

                        {this.state.error ? <p id="employee-error">{this.state.error}</p> : ""}
                        {this.handleClockInButtons()}
                        {this.handleBreakButtons()}
                    </fieldset>
                </form> 
            </section>
        );
    };
};