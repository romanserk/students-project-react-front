import * as actionType from '../actions'

const initialState = {
    projects: [],
    singleProject: {},
    participant: false,
    comments: []
}

const projectsReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.SET_PROJECTS: return {
            ...state,
            projects: action.projects
        }
        case actionType.SET_SINGLE_PROJECT: return {
            ...state,
            singleProject: action.singleProject
        }
        case actionType.SET_PROJECT_PARTICIPANT: return {
            ...state,
            participant: action.participant
        }
        case actionType.SET_PROJECT_COMMENTS: return {
            ...state,
            comments: action.comments
        }
        default: return state
    }

}


export default projectsReducer;
