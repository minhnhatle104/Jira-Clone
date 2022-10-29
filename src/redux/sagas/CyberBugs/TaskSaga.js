import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notifiFunction } from "../../../util/Notification/NotificationComponent"
import { CLOSE_DRAWER, GET_PROJECT_DETAIL_SAGA } from "../../constants/CyberBugs/CyberBugs"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant"
import {CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA} from "../../constants/CyberBugs/TaskConstants"

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


function * updateTaskStatusSaga(action){
    const {taskUpdateStatus} = action

    try{
        // Cập nhật api status cho task hiện tại ( Task đang mở modal)
        const {data,status}=yield call(()=>taskService.updateStatusTask(taskUpdateStatus))
        
        // Sau khi thành công gọi lại GET_PROJECT_DETAIL_SAGA để sắp xếp lại thông tin các task
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_PROJECT_DETAIL_SAGA,
                projectId:taskUpdateStatus.projectId
            })

            yield put({
                type:GET_TASK_DETAIL_SAGA,
                taskId:taskUpdateStatus.taskId
            })
        }
        
    }catch(err){
        console.log(err.response?.data)
    }
}

export function * theoDoiUpdateStatusTask(){
    yield takeLatest(UPDATE_STATUS_TASK_SAGA,updateTaskStatusSaga)
}

function *handleChangePostApi(action){
    // Gọi action làm thay đổi taskDetailModal
    switch(action.actionType){
        case CHANGE_TASK_MODAL:{
            const {name,value} = action
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            })
        };break;
        case CHANGE_ASSIGNESS:{
            const {userSelected} = action

            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
        };break;
        case REMOVE_USER_ASSIGN:{
            const {userId} = action

            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        };break;
    }
    // Save qua api updateTask
    // Lấy dữ liệu từ state.taskDetailModal
    const {taskDetailModal} = yield select(state => state.TaskReducer)
    // Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
    
    const listUserAsign = taskDetailModal.assigness?.map((user,index)=>{
        return user.id
    })

    const taskUpdateApi = {...taskDetailModal,listUserAsign}
    try{
        const {data,status} = yield call(()=>taskService.updateTask(taskUpdateApi))

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_PROJECT_DETAIL_SAGA,
                projectId:taskUpdateApi.projectId
            })

            yield put({
                type:GET_TASK_DETAIL_SAGA,
                taskId:taskUpdateApi.taskId
            })
        }
    }catch(err){
        console.log(err)
        console.log(err.response?.data)
    }
}

export function * theoDoiHandleChangePostApi(){
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA,handleChangePostApi)
}