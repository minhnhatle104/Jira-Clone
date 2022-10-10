import {delay, put, takeLatest} from 'redux-saga/effects'
import { USER_SIGNIN_API } from "../../constants/CyberBugs/CyberBugs"
import {cyberBugsService} from "../../../services/CyberBugsService"
import {DISPLAY_LOADING, HIDE_LOADING} from "../../constants/LoadingConstant"
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'

// Quản lý các action saga

function * signInSaga(action){
    console.log(action)
    yield put({
        type:DISPLAY_LOADING
    })
    yield  delay(500)
    // Gọi api
    try{
        const {data,status} = yield cyberBugsService.signInCyberbugs(action.userLogin)
        console.log(data)
        // Lưu vào localStorage khi đăng nhập thành công
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))
    }catch(err){
        console.log(err.response.data)
    }
    
    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiSignIn(){
    yield takeLatest(USER_SIGNIN_API,signInSaga)
}