import jwt from "jsonwebtoken";

class AuthService {

    login = (cred) => {
        var result = fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cred),
        }).then(response => {
            if (response.ok) {
                console.log("Login success!")
                return response.json();
            } else {
                console.log("Login failed!")
            }
        }).then(data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', data.username);
            sessionStorage.setItem('roles', JSON.stringify(data.roles));
            return true
        }).catch(error => {
            console.log('Login error: ', error)
            return false
        })
        return result
    }

    logout() {
        sessionStorage.clear();
    }

    getUser() {
        return sessionStorage.getItem('user');
    }

    isAuthenticated() {
        var token = sessionStorage.getItem('token');
        if (token) {
            var decodedToken = jwt.decode(token, {complete: true});
            var dateNow = new Date();
            if (decodedToken.exp < dateNow.getTime()) {
                console.log("Token expired!")
                return false
            }
            return true;
        } else {
            return false
        }
    }

    getToken() {
        return sessionStorage.getItem('token')
    }

}

export default new AuthService();
