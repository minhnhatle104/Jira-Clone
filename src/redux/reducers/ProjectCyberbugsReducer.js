import { GET_ALL_PROJECT } from "../constants/CyberBugs/ProjectConstants"

const initialState = {
  projectList: [],
  arrProject: [] // Get all project cho dropdown
}

export const ProjectCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList
      return { ...state }
    }
    case GET_ALL_PROJECT:{
      state.arrProject= action.arrProject
      return {...state}
    }
    default:
      return { ...state }
  }
}
