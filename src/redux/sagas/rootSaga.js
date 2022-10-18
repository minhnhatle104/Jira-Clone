import {all} from "redux-saga/effects"
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga"
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga"
import * as ProjectSaga from "./CyberBugs/ProjectSaga"

export function * rootSaga(){
    yield all([
        CyberBugs.theoDoiSignIn(),
        CyberBugs.theoDoiGetUser(),
        CyberBugs.theoDoiAddUserProject(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProject(),
        ProjectSaga.theoDoiGetListProject(),
        ProjectSaga.theoDoiUpdateProject(),
        ProjectSaga.theoDoiDeleteProject()
    ])
}