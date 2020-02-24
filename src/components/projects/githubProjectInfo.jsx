import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import MySpinner from "../hoc/Spinner";

import { repositoryInfo } from "./ProjectFunctions";

const GithubProjectInfo = props => {
  const [gitRepoInfo, setGitRepoInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getRepositoryInfo = async repoName => {
    await repositoryInfo(repoName)
      .then(repo => {
        setGitRepoInfo({ description: repo.data.description });
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getRepositoryInfo(
      props.githubLink.slice(props.githubLink.lastIndexOf("/") + 1)
    );

    // eslint-disable-next-line
  }, [props.githubLink]);
  return loading ? (
    <MySpinner />
  ) : (
    <>
      <Card.Text className="mt-4">
        <strong>Description on Github</strong>
      </Card.Text>
      <Card.Text className="mt-2">{gitRepoInfo.description}</Card.Text>
    </>
  );
};

const mapStateToProps = state => {
  return {
    singleProject: state.projects.singleProject
  };
};

export default connect(mapStateToProps)(GithubProjectInfo);
