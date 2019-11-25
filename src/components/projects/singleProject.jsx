import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import AuthContext from '../../context/authContext';
import jwt_decode from 'jwt-decode';
import MySpinner from '../hoc/Spinner'


import { getSingleProjectFromServer, joinProject, removeProject, leaveProject } from './ProjectFunctions'
import ProjectButton from './projectButton/projectButton'




const SingleProject = (props) => {

    const [project, setProject] = useState({})
    const [participant, setParticipant] = useState(false)
    const [loading, setLoading] = useState(true);

    const deleteHandler = () => {
        removeProject(project.ID)
            .then(res => {
                props.history.push(`/profile/${project.user_name}`)
            })
            .catch(err => {
                console.log(err)
            });
    }

    const joinHandler = async (context) => {
        await joinProject(context.userData.ID, project.ID)
            .then(() => {
                setParticipant(true)
                getProject(props.history.location.pathname.slice(9))
            })
    }

    const leaveHandler = async (context) => {
        await leaveProject(context.userData.ID, project.ID)
            .then(() => {
                setParticipant(false)
                getProject(props.history.location.pathname.slice(9))
            })
    }

    const getProject = async (name) => {
        let userID = 0;
        if (localStorage.user_login) {
            userID = jwt_decode(localStorage.user_login).ID
        }
        await getSingleProjectFromServer(name, userID)
            .then(project => {

                project.participants.forEach(elem => {
                    if (elem.user.ID === userID) {
                        setParticipant(true)
                    }
                })
                setProject(project);

            })
            .then(res => {
                setLoading(false)
            });

    }



    useEffect(() => {
        getProject(props.history.location.pathname.slice(9))
        // eslint-disable-next-line
    }, [])

    return (
        loading ?
            <MySpinner />
            :
            <Container>
                < Card className="mt-5">
                    <Card.Body>
                        <Card.Title>{project.project_name}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                        <Row>
                            <Col sm={2}>
                                <Card.Text>Tools: </Card.Text>
                            </Col>
                            <Col sm={10}>
                                <ul className="p-0 m-0 list-inline">
                                    {project.tool_ps && project.tool_ps.map((tool) => {
                                        return (
                                            <li key={tool.id} className="mr-5 list-inline-item">
                                                <Card.Text className="mb-0">{tool.tool}</Card.Text>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                <Card.Text>Participants: </Card.Text>
                            </Col>
                            <Col sm={10}>
                                <ul className="p-0 m-0 list-inline">
                                    {project.participants && project.participants.map((participant) => {
                                        return (
                                            <li key={participant.id} className="mr-5 list-inline-item">
                                                <Card.Text className="mb-0">{participant.user.user_name}</Card.Text>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <ProjectButton project={project} joinHandler={joinHandler} leaveHandler={leaveHandler} participant={participant} deleteHandler={deleteHandler} />
                    </Card.Footer>
                </Card >
            </Container>


    )
}

export default SingleProject;