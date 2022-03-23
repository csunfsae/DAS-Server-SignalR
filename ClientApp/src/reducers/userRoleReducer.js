import { LOGGEDIN, LOGGEDOUT } from '../actions/userRoleAction';

const initialState = {
    role: null
}

function userRoleReducer(state = initialState, action) {
    switch (action.type) {
        case LOGGEDIN:
            return {
                ...state,
                role: action.payload
            }
        case LOGGEDOUT:
            return {
                ...state,
                role: null
            }
        default:
            return state;
    }
}

export default userRoleReducer;