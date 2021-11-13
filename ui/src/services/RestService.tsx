import AuthService from './AuthService'

class RestService {

    getTime = () => {
        return fetch("/api/time", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return ""
            }
        }).catch(error => {
            console.error('ERROR!', error)
            return ""
        })
    }

    fetchCustomers = async () => {
        const response = await fetch("/api/customer", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + AuthService.getToken(),
            },
        })
        const data = await response.json()
        return data
    }

    deleteCustomer = async (id: any) => {
        console.log('Delete', id)
        const response = await fetch(`/api/customer/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + AuthService.getToken(),
            },
        })
        const data = await response
        if (data.ok) {
            return true
        } else {
            return false
        }
    }

    addCustomer = async (customer: any) => {
        console.log(JSON.stringify(customer))
        const res = await fetch('/api/customer', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + AuthService.getToken(),
            },
            body: JSON.stringify(customer),
        })
        const data = await res.json()
        return data
    }

    getHelloFuture = () => {
        return new Promise(function (resolve, reject) {
            // call resolve if the method succeeds
            resolve("Hello!");
        })
    }

    getHello = () => {
        return "Hello!"
    }

    getPieDataFromServer() {
        return fetch("/api/pie-data", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + AuthService.getToken(),
            },
        }).then(res => res.json()).catch(error => {
            console.error('ERROR!', error)
            return ""
        })
    }

    getColumnDataFromServer() {
        return fetch("/api/column-data", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + AuthService.getToken(),
            },
        }).then(res => res.json()).catch(error => {
            console.error('ERROR!', error)
            return ""
        })
    }

}

export default new RestService();
