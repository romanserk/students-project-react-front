import React, { useEffect, useState } from "react";
import ProjectsList from "../projects/projectsList";

import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import * as actionType from "../../store/actions";
import MySpinner from "../hoc/Spinner";

import { getProjectsFromServerBySearch } from "../projects/ProjectFunctions";
import NoSearchResults from "../pageError/NoSearchResults";

const SearchResults = props => {
  const [loading, setLoading] = useState(true);
  const [haveResults, setHaveResults] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getSearchResults = async () => {
    await getProjectsFromServerBySearch(searchText)
      .then(projectsRes => {
        if (projectsRes.length > 0) {
          props.setProjects(projectsRes);
          setHaveResults(true);
        } else {
          setHaveResults(false);
        }

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    setSearchText(props.location.state.searchText);
    getSearchResults();
    // eslint-disable-next-line
  }, [props.location.state.searchText]);

  return (
    <Container>
      {loading ? (
        <MySpinner />
      ) : haveResults ? (
        <ProjectsList />
      ) : (
        <NoSearchResults searchText={searchText} />
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setProjects: projects =>
      dispatch({ type: actionType.SET_PROJECTS, projects: projects })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
