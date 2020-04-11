import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actionType from '../../store/actions'


import { addNewProject, addProjectTools } from './ProjectFunctions';
import CustomToolbarEditor from '../textEditor/TextEditor'

import { InputGroup, FormControl, Form, Container, Button, Col, Row } from 'react-bootstrap'



const AddProject = (props) => {

    const [projectToAdd, setProjectToAdd] = useState({
        project_name: '',
        description: '',
        projectTools: [''],
        userID: '',
        git_link: ''
    })

    const [description, setDescription] = useState("");

    const onChange = (event, index) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === 'projectTools') {
            const tempArr = projectToAdd.projectTools;
            tempArr[index] = value;
            value = tempArr;
        }
        setProjectToAdd(projectToAdd => {
            return { ...projectToAdd, [name]: value };
        });

    }

    const onSubmit = (e) => {
        e.preventDefault()


        const newProject = {
            ...projectToAdd,
            userID: props.userData.ID,
            description: description
        };

        setProjectToAdd({
            project_name: '',
            description: '',
            projectTools: [''],
            userID: '',
            git_link: ''
        });

        addNewProject(newProject).then(res => {
            addProjectTools(newProject.projectTools, res.ID)
        });
    }

    const addTool = () => {
        const tempArr = projectToAdd.projectTools;
        tempArr.push('');

        setProjectToAdd(projectToAdd => {
            return { ...projectToAdd, projectTools: tempArr };
        });

    }


    return (
        props.isLoggedIn ?
            <Container>
                <Form onSubmit={(e) => onSubmit(e)} className="p-5">
                    <InputGroup className="mb-3 mt-5">
                        <FormControl
                            placeholder="project name"
                            name="project_name"
                            type="text"
                            value={projectToAdd.project_name}
                            onChange={onChange}
                        />
                    </InputGroup>
                        <CustomToolbarEditor
                            text={description}
                            setText={setDescription}
                        />
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="github link"
                            type="text"
                            name="git_link"
                            value={projectToAdd.git_link}
                            onChange={onChange}
                        />
                    </InputGroup>
                    <Row>
                        <Col sm={2}>
                            <Button variant="primary" className="btn btn-md" onClick={() => addTool()}>
                                Add Tool
                                </Button>
                        </Col>
                        <Col sm={10}>
                            {projectToAdd.projectTools.map((elem, index) => {
                                return <InputGroup key={index} className="mb-3">
                                    <FormControl
                                        placeholder="tools you use in this project e.g: JavaScript java ..."
                                        type="text"
                                        name="projectTools"
                                        value={elem}
                                        onChange={(e) => onChange(e, index)}
                                    />
                                </InputGroup>
                            })}
                        </Col>
                    </Row>
                    <Button variant="success"
                        type="submit"
                        className="btn-lg btn-block">
                        add project
                    </Button>
                </Form>
            </Container>
            :
            props.history.push(`/login`)


    )
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        isLoggedIn: state.users.isLoggedIn,
        userData: state.users.userData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setProjects: (projects) => dispatch({ type: actionType.SET_PROJECTS, projects: projects }),
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(AddProject);