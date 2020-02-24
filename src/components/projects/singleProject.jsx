import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionType from "../../store/actions";

import MySpinner from "../hoc/Spinner";
import { Link } from "react-router-dom";

import {
  getSingleProjectFromServer,
  joinProject,
  removeProject,
  leaveProject
} from "./ProjectFunctions";

import GithubProjectInfo from "./githubProjectInfo";
import ProjectButton from "./projectButton/projectButton";
import ProjectComments from "./projectComments/projectComments";

const SingleProject = props => {
  const [loading, setLoading] = useState(true);

  const deleteHandler = () => {
    removeProject(props.singleProject.ID)
      .then(() => {
        props.history.push(`/profile/${props.userData.user_name}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const joinHandler = async () => {
    await joinProject(props.userData.ID, props.singleProject.ID).then(() => {
      props.setProjectParticipant(true);
    });
  };

  const leaveHandler = async () => {
    await leaveProject(props.userData.ID, props.singleProject.ID).then(() => {
      props.setProjectParticipant(false);
    });
  };

  const getProject = async name => {
    await getSingleProjectFromServer(name, props.userData.ID).then(project => {
      project.participants.forEach(elem => {
        if (elem.user && elem.user.ID === props.userData.ID) {
          props.setProjectParticipant(true);
        }
      });
      props.setSingleProject(project);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProject(props.history.location.pathname.slice(9));
    // eslint-disable-next-line
  }, [props.participant]);

  return loading ? (
    <MySpinner />
  ) : (
    <Container>
      <Card className="mt-5 p-3">
        <Card.Body>
          <Card.Title>{props.singleProject.project_name}</Card.Title>
          <Card.Text className="mt-4">
            {props.singleProject.description}
          </Card.Text>
          {props.singleProject.git_link ? (
            <GithubProjectInfo
              setLoading={setLoading}
              githubLink={props.singleProject.git_link}
            />
          ) : null}
          <Row className="mb-2 mt-5">
            <Col sm={2}>
              <Card.Text>Github repository </Card.Text>
            </Col>
            <Col sm={10}>
              <a href={props.singleProject.git_link} target="_blanck">
                {props.singleProject.git_link}
              </a>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm={2}>
              <Card.Text>Tools: </Card.Text>
            </Col>
            <Col sm={10}>
              <ul className="p-0 m-0 list-inline">
                {props.singleProject.tool_ps &&
                  props.singleProject.tool_ps.map(tool => {
                    return (
                      <li key={tool.id} className="mr-5 list-inline-item">
                        <Card.Text className="mb-0">{tool.tool}</Card.Text>
                      </li>
                    );
                  })}
              </ul>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col sm={2}>
              <Card.Text>Participants: </Card.Text>
            </Col>
            <Col sm={10}>
              <ul className="p-0 m-0 list-inline">
                {props.singleProject.participants &&
                  props.singleProject.participants.map(participant => {
                    return (
                      <li
                        key={`${participant.id}${participant.user_name}`}
                        className="mr-5 list-inline-item"
                      >
                        <Link
                          to={{
                            pathname: "/profile/" + participant.user.user_name,
                            state: {
                              user: participant.user.user_name
                            }
                          }}
                        >
                          <span>{participant.user.user_name}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </Col>
          </Row>
          <ProjectButton
            joinHandler={joinHandler}
            leaveHandler={leaveHandler}
            deleteHandler={deleteHandler}
          />
          <ProjectComments setLoading={setLoading} />
        </Card.Body>
      </Card>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    loggedIn: state.users.isLoggedIn,
    userData: state.users.userData,
    singleProject: state.projects.singleProject,
    participant: state.projects.participant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSingleProject: singleProject =>
      dispatch({
        type: actionType.SET_SINGLE_PROJECT,
        singleProject: singleProject
      }),
    setProjectParticipant: bool =>
      dispatch({ type: actionType.SET_PROJECT_PARTICIPANT, participant: bool })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
