import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'



import { getProjectsFromServer } from './ProjectFunctions'

import MySpinner from '../hoc/Spinner'


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
    }, [props.user_name])

    return (
        loading ?
            <MySpinner />
            :
            props.projects.map((elem) => {
                return <Card className="m-3" key={elem.ID} >
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
                        <ul className="p-0 m-0 list-inline">
                            {elem.tool_ps.map((tool) => {
                                return (
                                    <li key={tool.id} className="mr-5 list-inline-item">
                                        <p className="mb-0">{tool.tool}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </Card.Footer>
                </Card >
            })

    )
}
const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects }),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectsList));