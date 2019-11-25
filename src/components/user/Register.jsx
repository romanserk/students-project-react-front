import React, { useState } from 'react'
import { register } from './UserFunctions'

const Register = (props) => {

    const [userToRegister, setUserToRegister] = useState({
        user_name: '',
        email: '',
        password: ''
    })


    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserToRegister(userToRegister => {
            return { ...userToRegister, [name]: value };
        });
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const newUser = {
            user_name: userToRegister.user_name,
            email: userToRegister.email,
            password: userToRegister.password
        }

        register(newUser).then(res => {
            props.history.push(`/login`)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={userToRegister.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="user_name"
                                placeholder="Enter User Name"
                                value={userToRegister.user_name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={userToRegister.password}
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                        >
                            Register!
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Register