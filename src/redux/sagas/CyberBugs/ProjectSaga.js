import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant";

function * createProjectSaga(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>cyberBugsService.createProjectAuthorize(action.newProject))
        if(status === STATUS_CODE.SUCCESS){
            console.log(data)
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