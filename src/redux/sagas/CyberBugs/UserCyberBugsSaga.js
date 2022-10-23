import { call, delay, put, takeLatest, select } from 'redux-saga/effects'
import { ADD_USER_PROJECT_API, GET_USER_API, GET_USER_SEARCH, REMOVE_USER_PROJECT_API, USER_SIGNIN_API, USLOGIN } from "../../constants/CyberBugs/CyberBugs"
import { cyberBugsService } from "../../../services/CyberBugsService"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant"
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { userService } from '../../../services/UserService'
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/CyberBugs/UserConstants'

// Quản lý các action saga

function* signInSaga(action) {
    console.log(action)
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    // Gọi api
    try {
        const { data, status } = yield call(() => cyberBugsService.signInCyberbugs(action.userLogin))
        console.log(data)
        // Lưu vào localStorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        let history = yield select(state => state.HistoryReducer.history)
        history.push('/home')

    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiSignIn() {
    yield takeLatest(USER_SIGNIN_API, signInSaga)
}


function* getUserSaga(action) {

    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword))

        yield put({
            type: GET_USER_SEARCH,
            listUserSearch: data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiGetUser() {
    yield takeLatest(GET_USER_API, getUserSaga)
}


function* addUserProjectSaga(action) {

    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject))

        yield put({
            type: "GET_LIST_PROJECT_SAGA"
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiAddUserProject() {
    yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga)
}

function* removeUserProjectSaga(action) {

    try {
        const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject))

        yield put({
            type: "GET_LIST_PROJECT_SAGA"
        })

    } catch (err) {
        console.log(err.response.data)
    }

}

export function* theoDoiRemoveUserProject() {
    yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga)
}

// Get user By project ID
function * getUserByProjectIdSaga(action){
    try{
        const {data,status} = yield call(()=>userService.getUserByProjectId(action.projectId))

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }

    }catch(err){
        console.log(err.response?.data)
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:[]
            })
        }
    }
}

export function * theoDoiGetUserByProjectId(){
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA,getUserByProjectIdSaga)
}