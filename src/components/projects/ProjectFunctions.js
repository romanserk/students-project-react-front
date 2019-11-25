import axios from 'axios';



export const getProjectsFromServer = (userName, userID) => {
    if (userName) {
        return axios
            .get('https://infinite-plains-84143.herokuapp.com/projects/user',
                {
                    params: {
                        user_name: userName,
                        userID: userID
                    }
                })
            .then(response => {
                response.data.prticipant_in.forEach(part => {
                    response.data.opned_projects.push(part.project)
                })

                return response.data.opned_projects;
            })
            .catch(err => console.log(err))
    } else {
        return axios
            .get('https://infinite-plains-84143.herokuapp.com/projects')
            .then(response => {
                return response.data.data;
            })
            .catch(err => console.log(err))
    }
}



export const getSingleProjectFromServer = (name, userID) => {
    return axios
        .get('https://infinite-plains-84143.herokuapp.com/projects/single_project',
            {
                params: {
                    project_name: name,
                    userID: userID
                }
            })
        .then(response => {
            console.log(response)
            return response.data.data;
        })
        .catch(err => console.log(err))
}





export const addNewProject = project => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/projects/add', {
            project_name: project.project_name,
            description: project.description,
            userID: project.userID,
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}



export const removeProject = (ID) => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/projects/remove', {
            projectID: ID
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}



export const addProjectTools = (paramtool, paramID) => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/tools/add', {
            tools: paramtool,
            ID: paramID
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}


export const joinProject = (userID, projectID) => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/projects/join', {
            userID: userID,
            projectID: projectID
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const leaveProject = (userID, projectID) => {
    return axios
        .post('https://infinite-plains-84143.herokuapp.com/projects/leave', {
            userID: userID,
            projectID: projectID
        })
        .then(response => {

        })
        .catch(err => {
            console.log(err)
        })
}






