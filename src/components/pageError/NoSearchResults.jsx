import React from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const NoSearchResults = props => {
  return (
    <>
      <Alert variant="danger d-flex justify-content-center">
        <h1>no results containing {props.searchText}</h1>
      </Alert>
      <Link
        to={{
          pathname: "/"
        }}
        className="h5 d-flex justify-content-center"
      >
        <p>Back Home</p>
      </Link>
    </>
  );
};

export default NoSearchResults;
