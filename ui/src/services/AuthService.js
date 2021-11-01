import jwt from "jsonwebtoken";

class AuthService {

    login = (cred) => {
        var result = fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify(cred),
        }).then(response => {
            if (response.ok) {
                console.log("Login success!")
                return response.text();
            } else {
                console.log("Login failed!")
            }
        }).then(data => {
            var user = data.split(" ")[0]
            var token = data.split(" ")[1]
            localStorage.setItem('user', user)
            localStorage.setItem('token', token)
            return true
        }).catch(error => {
            console.log('Login error: ', error)
            return false
        })
        return result
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    getUser() {
        return localStorage.getItem('user')
    }

    isAuthenticated() {
        var token = localStorage.getItem('token')
        if (token) {
            return jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
                if (err) {
                   console.log("Token expired!")
                    return false
                } else {
                    return true
                }
            });
        } else {
            return false
        }
    }

    getToken() {
        return localStorage.getItem('token')
    }

}

export default new AuthService();
