import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

import { repositoryInfo } from "./ProjectFunctions";

const GithubProjectInfo = props => {
  const [gitRepoInfo, setGitRepoInfo] = useState({});

  const getRepositoryInfo = async repoName => {
    await repositoryInfo(repoName).then(repo => {
      console.log(repo);
      setGitRepoInfo({ description: repo.data.description });
    });
  };

  useEffect(() => {
    getRepositoryInfo(
      props.githubLink.slice(props.githubLink.lastIndexOf("/") + 1)
    );

    // eslint-disable-next-line
  }, [props.githubLink]);
  return (
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
