const EmployeeService = {
    getEmployees(){
        return fetch("http://localhost:8000/api/employees", {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=>Promise.reject(e));
                };

                return res.json();
            })
    },
    getEmployee(id){
        return fetch(`http://localhost:8000/api/employees/${id}`, {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=>Promise.reject(e));
                };

                return res.json();
            })
    },
    addEmployees(){
        return fetch("http://localhost:8000/api/employees", {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=>Promise.reject(e));
                };

                return res.json();
            })
    },
    updateEmployees(){
        return fetch("http://localhost:8000/api/employees", {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=>Promise.reject(e));
                };

                return res.json();
            })
    },
    removeEmployees(){
        return fetch("http://localhost:8000/api/employees", {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=>Promise.reject(e));
                };

                return res.json();
            })
    }
};

module.exports = EmployeeService;