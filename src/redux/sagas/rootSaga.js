import {all} from "redux-saga/effects"
import * as CyberBugs from "./CyberBugs/UserCyberBugsSaga"
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga"
import * as ProjectSaga from "./CyberBugs/ProjectSaga"
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga"
import * as PrioritySaga from "./CyberBugs/PrioritySaga"
import * as TaskSaga from "./CyberBugs/TaskSaga"
import * as StatusSaga from "./CyberBugs/StatusSaga"

export function * rootSaga(){
    yield all([
        CyberBugs.theoDoiSignIn(),
        CyberBugs.theoDoiGetUser(),
        CyberBugs.theoDoiAddUserProject(),
        CyberBugs.theoDoiRemoveUserProject(),
        CyberBugs.theoDoiGetUserByProjectId(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        
        ProjectSaga.theoDoiCreateProject(),
        ProjectSaga.theoDoiGetListProject(),
        ProjectSaga.theoDoiUpdateProject(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProject(),

        TaskTypeSaga.theoDoiGetAllTaskType(),

        PrioritySaga.theoDoiGetAllPriority(),

        TaskSaga.theoDoiCreateTask(),

        StatusSaga.theoDoiGetAllStatus()
    ])
}