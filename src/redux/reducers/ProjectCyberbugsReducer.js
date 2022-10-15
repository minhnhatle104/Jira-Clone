const initialState = {
  projectList: []
}

export const ProjectCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList
      return { ...state }
    }
    default:
      return { ...state }
  }
}
