import { call, put, takeLatest } from "redux-saga/effects";
import { cyberBugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function * getAllProjectCategorySaga(){
    try{
        const {data,status} = yield call(()=>cyberBugsService.getAllProjectCategory())
    
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:"GET_PROJECT_CATEGORY",
                data:data.content
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function * theoDoiGetAllProjectCategory(){
    yield takeLatest("GET_PROJECT_CATEGORY_SAGA",getAllProjectCategorySaga)
}