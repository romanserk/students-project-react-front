import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Media,
  Form,
  Button,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import { connect } from "react-redux";
import * as actionType from "../../../store/actions";

import { Link } from "react-router-dom";
import MySpinner from "../../hoc/Spinner";

import { getProjectCommentsFromServer, postComment } from "../ProjectFunctions";
import userPlaceholder from "../../../imgs/placeholder-user1.png";

const ProjectComments = props => {
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState({
    content: ""
  });

  const onChange = event => {
    const name = event.target.name;
    let value = event.target.value;

    setComment(comment => {
      return { ...comment, [name]: value };
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    const newComment = {
      ...comment,
      userID: props.userData.ID,
      projectID: props.singleProject.ID
    };

    setComment({ content: "" });
    postComment(newComment).then(() => {
      getComments();
    });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        Please <strong>login</strong> in order to post comment
      </Popover.Content>
    </Popover>
  );

  const getComments = async () => {
    await getProjectCommentsFromServer(props.singleProject.ID)
      .then(comments => {
        props.setProjectComments(comments);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <MySpinner />
  ) : (
    <>
      <Row className="mt-5">
        <Col>
          <h5>Comments</h5>
          <Form className="mt-5" onSubmit={e => onSubmit(e)}>
            <Row>
              <Col sm={10}>
                <Form.Control
                  name="content"
                  type="text"
                  as="textarea"
                  rows="4"
                  placeholder="Your comment ..."
                  value={comment.content}
                  onChange={onChange}
                />
              </Col>
              <Col sm={2}>
                {props.loggedIn ? (
                  <Button type="submit" className="btn-block">
                    Post
                  </Button>
                ) : (
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={popover}
                  >
                    <Button className="btn-block">Post</Button>
                  </OverlayTrigger>
                )}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <ul className="list-unstyled">
            {props.comments &&
              props.comments.map(elem => {
                return (
                  <li
                    className="pr-5 pl-2 pb-4"
                    key={`${elem.id}${elem.userID}`}
                  >
                    <Media>
                      <img
                        width={50}
                        height={50}
                        className="mr-3"
                        src={userPlaceholder}
                        alt="Generic placeholder"
                      />
                      <Media.Body className="bg-my-secondary p-3 rounded ml-2">
                        <Link
                          to={{
                            pathname: "/profile/" + elem.user.user_name,
                            state: {
                              user: elem.user.user_name
                            }
                          }}
                        >
                          {elem.user.user_name}
                        </Link>
                        <p className="text-muted float-right">
                          <i>
                            <small>
                              {elem.created_date
                                .split("-")
                                .reverse()
                                .join("-")}
                            </small>
                          </i>
                        </p>
                        <p className="ml-2 mt-2"> {elem.content}</p>
                      </Media.Body>
                    </Media>
                  </li>
                );
              })}
          </ul>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.users.isLoggedIn,
    userData: state.users.userData,
    singleProject: state.projects.singleProject,
    comments: state.projects.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjectComments: comments =>
      dispatch({ type: actionType.SET_PROJECT_COMMENTS, comments: comments })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComments);
