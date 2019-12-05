import * as actionType from '../actions'

const initialState = {
    isLoggedIn: false,
    userData: {},
    profilePageData: {}
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.SET_LOGGED_IN: return {
            ...state,
            isLoggedIn: action.isLogged
        }
        case actionType.SET_USER_DATA: return {
            ...state,
            userData: action.userData
        }
        case actionType.REMOVE_USER_DATA: return {
            ...state,
            userData: {}
        }
        case actionType.SET_PROFILE_PAGE_DATA: return {
            ...state,
            profilePageData: action.profilePageData
        }
        default: return state
    }
}

export default usersReducer;