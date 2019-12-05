import React, { useState } from 'react'

import { register } from './UserFunctions'
import { Alert, Form, Button, Col, Container, Row } from 'react-bootstrap';



const Register = (props) => {

    const [userToRegister, setUserToRegister] = useState({
        user_name: '',
        email: '',
        password: '',
        github_profile: ''
    })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserToRegister(userToRegister => {
            return { ...userToRegister, [name]: value };
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const newUser = {
            user_name: userToRegister.user_name,
            email: userToRegister.email,
            password: userToRegister.password,
            github_profile: userToRegister.github_profile
        }

        register(newUser)
            .then(res => {
                if (res.response && res.response.data.error) {
                    setError(res.response.data.error)
                } else {
                    props.history.push(`/login`)
                }
                setLoading(false);
            })
    }

    return (

        <Container>
            <Row className="row">
                <Col className="col-md-6 mt-5 pt-5 mx-auto">
                    <Form onSubmit={onSubmit}>
                        <h2 className="mb-4 font-weight-normal">Register</h2>
                        {error && <Alert variant="danger" ><p className="mb-0">{error}</p></Alert>}
                        <Form.Row>
                            <Form.Group as={Col} className="mx-auto" md="12" controlId="validationCustom01">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    required
                                    value={userToRegister.email}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className="mx-auto" md="12" controlId="validationCustom02">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter User Name"
                                    required
                                    value={userToRegister.user_name}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} className="mx-auto" md="12" controlId="validationCustom03">
                                <Form.Label>Github Profile</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="github_profile"
                                    placeholder="your github profile"
                                    value={userToRegister.github_profile}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={userToRegister.password}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button
                            className="btn-block"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Loading…' : 'Submit'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )

}

export default Register