import { call, delay, put, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notifiFunction } from "../../../util/Notification/NotificationComponent"
import { CLOSE_DRAWER } from "../../constants/CyberBugs/CyberBugs"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant"
import {GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA} from "../../constants/CyberBugs/TaskConstants"

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

function * getTaskDetailSaga(action){
    try{
        const {data,status}=yield call(()=>taskService.getTaskDetail(action.taskId))
        
        yield put({
            type:GET_TASK_DETAIL,
            taskDetailModal:data.content
        })
        
    }catch(err){
        console.log(err.response?.data)
    }
}

export function * theoDoiGetTaskDetail(){
    yield takeLatest(GET_TASK_DETAIL_SAGA,getTaskDetailSaga)
}