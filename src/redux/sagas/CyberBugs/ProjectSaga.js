import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant";
import {history} from "../../../util/history"

function * createProjectSaga(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>cyberBugsService.createProjectAuthorize(action.newProject))
        if(status === STATUS_CODE.SUCCESS){
            console.log(data)
            // let history = yield select(state => state.HistoryReducer.history)
            // history.push('/projectmanagement')
            history.push('/projectmanagement')
        }
    }catch(err){
        console.log(err)
    }

    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiCreateProject(){
    yield takeLatest("CREATE_PROJECT_SAGA",createProjectSaga)
}

function * getListProjectSaga(){
    try{
        const {data,status} = yield call(()=>cyberBugsService.getAllProject())
        if(status === STATUS_CODE.SUCCESS){
            console.log(data)
            yield put({
                type:"GET_LIST_PROJECT",
                projectList: data.content
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function * theoDoiGetListProject(){
    yield takeLatest("GET_LIST_PROJECT_SAGA",getListProjectSaga)
}