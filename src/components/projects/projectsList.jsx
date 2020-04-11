import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import messagesIcon from '../../imgs/chat.png';
import participantsIcon from '../../imgs/network.png';

import { Col, Row } from 'react-bootstrap';

import Editor from "draft-js-plugins-editor";
import { convertFromRaw, EditorState } from "draft-js";


const ProjectsList = (props) => {
    // const [editorStateSummary, setEditorStateSummary] = useState(
    //     createEditorStateWithText(" ")
    // );    

    const setRitchTextDescription = (description) => {
        let rawEditorData = JSON.parse(description);
        const contentState = convertFromRaw(rawEditorData);
        return EditorState.createWithContent(contentState);
    }


    return (

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
                    <Editor
                        editorState={setRitchTextDescription(elem.description)}
                        readOnly={true}
                        onChange={() => {}}
                    />
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
                        {!props.user ? <Col sm={4}>
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
        projects: state.projects.projects
    };
}



export default connect(mapStateToProps)(withRouter(ProjectsList));