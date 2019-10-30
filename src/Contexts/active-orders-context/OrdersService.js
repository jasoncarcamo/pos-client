const  OrdersService = {
    getOrders(){
        return fetch("http://localhost:8000/api/active-orders", {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json()
            })
    },
    getOrder(id){
        return fetch(`http://localhost:8000/api/active-orders${id}`, {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json();
            })
    },
    addOrder(order){
        return fetch("http://localhost:8000/api/active-orders", {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            },
            body: JSON.stringify(order)
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return;
            })
    },
    updateOrder(id, items){
        return fetch(`http://localhost:8000/api/active-orders/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            },
            body: JSON.stringify({orderitems: items})
        })
            .then( res => {

                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return;
            })
    },
    removeOrder(id){
        return fetch(`http://localhost:8000/api/active-orders/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e=> Promise.reject(e));
                };

                return res.json();
            })
    },
    deleteOrder(id){
        return fetch(`http://localhost:8000/api/active-orders/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            }
        })
            .then( res => {
                if(!res.ok){
                    return escape.json().then(e=> Promise.reject(e));
                }

                return;
            })
    }
};

module.exports = OrdersService;