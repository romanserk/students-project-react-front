import axios from "axios";
const localUrll = "http://localhost:4000";
const herokuUrl = "https://infinite-plains-84143.herokuapp.com";

export const getProjectsFromServer = (userName, userID) => {
  if (userName) {
    return axios
      .get(herokuUrl + "/projects/user", {
        params: {
          user_name: userName,
          userID: userID
        }
      })
      .then(response => {
        response.data.prticipant_in.forEach(part => {
          response.data.opned_projects.push(part.project);
        });

        return response.data.opned_projects;
      })
      .catch(err => console.log(err));
  } else {
    return axios
      .get(herokuUrl + "/projects")
      .then(response => {
        return response.data.data;
      })
      .catch(err => console.log(err));
  }
};

export const getProjectsFromServerBySearch = searchText => {
  return axios
    .get(herokuUrl + "/projects/search", {
      params: {
        searchText: searchText
      }
    })
    .then(response => {
      return response.data.data;
    })
    .catch(err => console.log(err));
};

export const getSingleProjectFromServer = (name, userID) => {
  return axios
    .get(herokuUrl + "/projects/single_project", {
      params: {
        project_name: name,
        userID: userID
      }
    })
    .then(response => {
      return response.data.data;
    })
    .catch(err => console.log(err));
};

export const addNewProject = project => {
  return axios
    .post(herokuUrl + "/projects/add", {
      project_name: project.project_name,
      description: project.description,
      userID: project.userID,
      git_link: project.git_link
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const removeProject = ID => {
  return axios
    .post(herokuUrl + "/projects/remove", {
      projectID: ID
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addProjectTools = (paramtool, paramID) => {
  return axios
    .post(herokuUrl + "/tools/add", {
      tools: paramtool,
      ID: paramID
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const joinProject = (userID, projectID) => {
  return axios
    .post(herokuUrl + "/projects/join", {
      userID: userID,
      projectID: projectID
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const leaveProject = (userID, projectID) => {
  return axios
    .post(herokuUrl + "/projects/leave", {
      userID: userID,
      projectID: projectID
    })
    .then(response => {})
    .catch(err => {
      console.log(err);
    });
};

export const getProjectCommentsFromServer = projectID => {
  return axios
    .get(herokuUrl + "/messages", {
      params: {
        projectID: projectID
      }
    })
    .then(response => {
      return response.data.data;
    })
    .catch(err => console.log(err));
};

export const postComment = comment => {
  return axios
    .post(herokuUrl + "/message/add", {
      content: comment.content,
      projectID: comment.projectID,
      userID: comment.userID
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
