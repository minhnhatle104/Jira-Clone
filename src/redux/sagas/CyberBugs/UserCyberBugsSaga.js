import {call, delay, put, takeLatest,select} from 'redux-saga/effects'
import { USER_SIGNIN_API, USLOGIN } from "../../constants/CyberBugs/CyberBugs"
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
        const {data,status} = yield call(()=>cyberBugsService.signInCyberbugs(action.userLogin)) 
        console.log(data)
        // Lưu vào localStorage khi đăng nhập thành công
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))

        yield put({
            type:USLOGIN,
            userLogin:data.content
        })

        let history = yield select(state => state.HistoryReducer.history)
        history.push('/home')

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