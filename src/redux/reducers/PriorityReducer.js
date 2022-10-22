import { GET_ALL_PRIORITY } from "../constants/CyberBugs/PriorityConstansts"

const initialState = {
    arrPriority: []
}

export const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PRIORITY:
            state.arrPriority = action.arrPriority
            return { ...state }

        default:
            return state
    }
}
