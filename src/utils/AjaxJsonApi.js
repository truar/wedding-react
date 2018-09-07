class AjaxJsonApi {
    constructor() {
        this.urlServer = "http://localhost:3001/guest";
    }

    login(guest) {
        return fetch(this.urlServer + '/login/' + guest.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password : guest.password}),
        })
        .then(res => res.json());
    }

    putGuest(guest) {
        return fetch(this.urlServer + '/' + guest._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guest), 
        })
        .then(res => res.json());
    }
}

export default AjaxJsonApi;