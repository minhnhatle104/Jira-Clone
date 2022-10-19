import { GET_EDIT_PROJECT, GET_PROJECT_DETAIL } from "../constants/CyberBugs/CyberBugs"

const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        description: "string",
        categoryId: "string"
    },
    projectDetail:{}
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EDIT_PROJECT:{
            state.projectEdit = action.projectEdit
            return {...state}
        }
        case GET_PROJECT_DETAIL:{
            state.projectDetail = action.projectDetail
            return {...state}
        }
        default:
            return state
    }
}
