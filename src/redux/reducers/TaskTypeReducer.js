import { GET_ALL_TASK_TYPE } from "../constants/CyberBugs/TaskTypeConstants"

const initialState = {
    arrTaskType: []
}

export const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TASK_TYPE: {
            state.arrTaskType = action.arrTaskType
            return { ...state }
        }
        default:
            return state
    }
}
