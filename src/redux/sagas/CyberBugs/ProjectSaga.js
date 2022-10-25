import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConstant";
import {history} from "../../../util/history"
import { CLOSE_DRAWER, DELETE_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, UPDATE_EDIT_PROJECT_SAGA } from "../../constants/CyberBugs/CyberBugs";
import { projectService } from "../../../services/ProjectService";
import {notifiFunction} from "../../../util/Notification/NotificationComponent"
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constants/CyberBugs/ProjectConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/CyberBugs/UserConstants";

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

function * updateProject(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>cyberBugsService.updateProject(action.projectEdit))
        if(status === STATUS_CODE.SUCCESS){
        }
        yield call(getListProjectSaga)

        yield put({
            type:CLOSE_DRAWER
        })
    }catch(err){
        console.log(err)
    }

    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiUpdateProject(){
    yield takeLatest(UPDATE_EDIT_PROJECT_SAGA,updateProject)
}


function * deleteProject(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>projectService.deleteProject(action.idProject))
        if(status === STATUS_CODE.SUCCESS){
            notifiFunction('success',"Delete project successfully!")
        }else{
            notifiFunction("error","Delete project failed!")
        }
        yield call(getListProjectSaga)
    }catch(err){
        notifiFunction("error","Delete project failed!")
        console.log(err)
    }

    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiDeleteProject(){
    yield takeLatest(DELETE_PROJECT_SAGA,deleteProject)
}

function * getProjectDetailSaga(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>projectService.getProjectDetail(action.projectId))

        // Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type:GET_PROJECT_DETAIL,
            projectDetail:data.content
        })
       
    }catch(err){
        console.log(err)
        history.push('/projectmanagement')
    }

    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiGetProjectDetail(){
    yield takeLatest(GET_PROJECT_DETAIL_SAGA,getProjectDetailSaga)
}


function * getAllProject(action){
    yield put({
        type:DISPLAY_LOADING
    })

    yield delay(500)

    try{
        const {data,status} = yield call(()=>projectService.getAllProject())

        // Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type:GET_ALL_PROJECT,
            arrProject:data.content
        })

        yield put({
            type:GET_USER_BY_PROJECT_ID_SAGA,
            projectId:data.content[0].id
        })
       
    }catch(err){
        console.log(err)
        history.push('/projectmanagement')
    }

    yield put({
        type:HIDE_LOADING
    })
}

export function * theoDoiGetAllProject(){
    yield takeLatest(GET_ALL_PROJECT_SAGA,getAllProject)
}