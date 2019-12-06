import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'

import messagesIcon from '../../imgs/chat.png';
import participantsIcon from '../../imgs/network.png';


import { getProjectsFromServer } from './ProjectFunctions'

import MySpinner from '../hoc/Spinner'
import { Col, Row } from 'react-bootstrap';


const ProjectsList = (props) => {


    const [loading, setLoading] = useState(true);

    const getProjects = async () => {

        await getProjectsFromServer(props.user_name, props.userID)
            .then(projectsRes => {
                props.setProjects(projectsRes)
            })
            .then(res => {
                setLoading(false);
            });

    }


    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, [])

    return (
        loading ?
            <MySpinner />
            :
            props.projects.map((elem) => {
                return <Card className="m-3" key={`${elem.ID}${elem.project_name}`} >
                    <Card.Header>
                        <Card.Text>
                            <Link
                                to={{
                                    pathname: '/project/' + elem.project_name,
                                    state: {
                                        project: elem
                                    }
                                }}
                                className="h5"
                            >
                                {elem.project_name}
                            </Link>
                            <i><small><span className="mb-0 float-right text-muted">{elem.created_date.split("-").reverse().join("-")}</span></small></i>
                        </Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Card.Text>
                                Initialized by:
                                <Link
                                    to={{
                                        pathname: '/profile/' + elem.user_name,
                                        state: {
                                            user: elem.user_name
                                        }
                                    }}
                                >
                                    <span className="ml-3">{elem.user_name}</span>
                                </Link>
                            </Card.Text>
                        </Card.Subtitle>
                        <Card.Text>{elem.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row >
                            <Col sm={8}>
                                <ul className="p-0 m-0 list-inline">
                                    {elem.tool_ps.map((tool) => {
                                        return (
                                            <li key={tool.id} className="mr-5 list-inline-item">
                                                <p className="mb-0">{tool.tool}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                            {!props.user_name ? <Col sm={4}>
                                <Row className="float-right mr-1">
                                    <img alt="comments" className="mt-1" style={{ height: "16px" }} src={messagesIcon}></img>
                                    <i className="ml-2"><p className="m-0 text-muted">{elem.messages.length}</p></i>
                                    <img alt="participants" className="ml-4 mt-1" style={{ height: "16px" }} src={participantsIcon}></img>
                                    <i className="ml-2"><p className="m-0 text-muted">{elem.participants.length}</p></i>
                                </Row>
                            </Col> : null}
                        </Row>
                    </Card.Footer>
                </Card >
            })

    )
}
const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        search: state.projects.search
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects }),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectsList));