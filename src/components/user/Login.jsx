import React, { useState } from 'react'
import { login } from './UserFunctions';



const Login = (props) => {

    const [user, setUser] = useState({
        user_name: '',
        password: ''
    })

    const [validUser, setValidUser] = useState(true);


    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(user => {
            return { ...user, [name]: value };
        });
    }



    const onSubmit = (e) => {
        e.preventDefault()

        const userToSubmit = {
            user_name: user.user_name,
            password: user.password
        }

        login(userToSubmit)
            .then(res => {
                if (res.response && res.response.data.error) {
                    setValidUser(false)
                } else {
                    localStorage.setItem('user_login', `${localStorage.usertoken}`);
                    props.setUserLoggedIn(true);

                    props.history.push({
                        pathname: `/profile/${userToSubmit.user_name}`,
                        state: { user: userToSubmit.user_name }
                    })

                }
            })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <div className="form-group">
                            {
                                /* show if username or password is invalid */
                                validUser ? null : <p className='text-danger'>Invalid username or password</p>
                            }
                            <label htmlFor="user_name">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="user_name"
                                placeholder="Enter User Name"
                                value={user.user_name}
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
                                value={user.password}
                                onChange={onChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                        >
                            Sign in
                            </button>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default Login