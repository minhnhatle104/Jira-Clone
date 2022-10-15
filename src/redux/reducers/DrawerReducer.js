import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_EDIT_FORM_PROJECT, SET_EDIT_FORM_PROJECT } from "../constants/CyberBugs/CyberBugs"

const initialState = {
    visible: false,
    size:'large',
    ComponentContentDrawer:  <p>default content</p>,
    callBackSubmit: (propsValue) => {alert("Click default")}
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:{
            return {...state,visible:true}
        }
        case CLOSE_DRAWER: {
            return { ...state, visible: false }
        }
        case OPEN_EDIT_FORM_PROJECT:{
            return {...state,visible:true,ComponentContentDrawer:action.Component}
        }
        case SET_EDIT_FORM_PROJECT:{
            return {...state,callBackSubmit:action.setSubmitFunction}
        }
        default:
            return state
    }
}
