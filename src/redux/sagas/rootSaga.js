import {all} from "redux-saga/effects"
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga"
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga"

export function * rootSaga(){
    yield all([
        CyberBugs.theoDoiSignIn(),
        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
    ])
}