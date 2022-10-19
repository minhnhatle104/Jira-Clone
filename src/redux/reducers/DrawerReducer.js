import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_EDIT_FORM_PROJECT, OPEN_FORM_CREATE_TASK, SET_EDIT_FORM_PROJECT } from "../constants/CyberBugs/CyberBugs"

const initialState = {
    visible: false,
    size:'large',
    title:'',
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
            return {...state,visible:true,ComponentContentDrawer:action.Component,title:action.title}
        }
        case SET_EDIT_FORM_PROJECT:{
            return {...state,callBackSubmit:action.setSubmitFunction}
        }
        case OPEN_FORM_CREATE_TASK:{
            state.visible=true
            state.title=action.title
            state.ComponentContentDrawer = action.ComponentContentDrawer
            return {...state}
        }
        default:
            return state
    }
}
