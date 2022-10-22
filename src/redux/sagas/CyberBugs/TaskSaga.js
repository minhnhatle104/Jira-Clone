import { call, delay, put, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notifiFunction } from "../../../util/Notification/NotificationComponent"
import { CLOSE_DRAWER } from "../../constants/CyberBugs/CyberBugs"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant"

function * createTaskSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try{
        const {data,status}=yield call(()=>taskService.createTask(action.taskObject))
        
        if(status === STATUS_CODE.SUCCESS){
            notifiFunction("success","Create task successfully !")
        }

        yield put({
            type:CLOSE_DRAWER
        })
        
    }catch(err){
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiCreateTask(){
    yield takeLatest("CREATE_TASK_SAGA",createTaskSaga)
}