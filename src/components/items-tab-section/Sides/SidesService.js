const SidesService = {
    getSides(){
        return fetch("https://morning-river-47424.herokuapp.com/api/menu/items", {
            headers: {
                'content-type': "application/json",
                'authorization': `bearer ${window.localStorage.getItem("admin")}`
            },
        })
            .then( res => {
                if(!res.ok){
                    return res.json().then(e => Promise.reject(e));
                }

                return res.json();
            })
    }
};

module.exports = SidesService;