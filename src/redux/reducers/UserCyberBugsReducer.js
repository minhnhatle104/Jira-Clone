import { USER_LOGIN } from "../../util/constants/settingSystem"
import { GET_USER_SEARCH, USLOGIN } from "../constants/CyberBugs/CyberBugs"

let usLogin = {}

if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
	userLogin: usLogin,
	userSearch: []
}

export const UserLoginCyberBugsReducer = (state = initialState, action) => {
	switch (action.type) {
		case USLOGIN: {
			state.userLogin = action.userLogin
			return { ...state }
		}
		case GET_USER_SEARCH: {
			state.userSearch = action.listUserSearch
			return { ...state }
		}
		default:
			return { ...state }
	}
}
