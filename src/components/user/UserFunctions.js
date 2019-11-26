import axios from 'axios';
import jwt_decode from 'jwt-decode';


export const register = newUser => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/users/register', {
            user_name: newUser.user_name,
            email: newUser.email,
            password: newUser.password,
            github_profile: newUser.github_profile
        }).then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}


export const login = user => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/users/login', {
            user_name: user.user_name,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {
            return err
        })
}



export const checkLoggedIn = (setUserLoggedIn) => {
    const token = localStorage.user_login;
    if (token) {
        const decoded = jwt_decode(token)
        return axios
            .post('https://infinite-plains-84143.herokuapp.com/users/logged_in', decoded)
            .then(response => {
                if (response.data === true) {
                    setUserLoggedIn(true)
                } else {
                    setUserLoggedIn(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        return false
    }

}


export const getUserFromServer = (user) => {
    return axios
        .get('https://infinite-plains-84143.herokuapp.com/users/profile',
            {
                params: {
                    name: user
                }
            })
        .then(response => {
            return response.data.data
        })
        .catch(err => {

            return err.response.data
        })

}

