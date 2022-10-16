import { GET_EDIT_PROJECT } from "../constants/CyberBugs/CyberBugs"

const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        description: "string",
        categoryId: "string"
    }
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EDIT_PROJECT:{
            state.projectEdit = action.projectEdit
            return {...state}
        }
        default:
            return state
    }
}
