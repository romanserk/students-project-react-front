import React, { useState } from 'react'
import { login } from './UserFunctions';
import { Alert, Form, Button, Col, Container, Row } from 'react-bootstrap';




const Login = (props) => {

    const [user, setUser] = useState({
        user_name: '',
        password: ''
    })
    const [error, setError] = useState(null);



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
                    setError(res.response.data.error)

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
        <Container>
            <Row className="row">
                <Col className="col-md-6 mt-5 pt-5 mx-auto">
                    <Form onSubmit={onSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} classname="mx-auto" md="12" controlId="validationCustom01">
                                {error && <Alert variant="danger" ><p className="mb-0">{error}</p></Alert>}
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_name"
                                    placeholder="Enter User Name"
                                    required
                                    value={user.user_name}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={user.password}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button className="btn-block" type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}


export default Login
