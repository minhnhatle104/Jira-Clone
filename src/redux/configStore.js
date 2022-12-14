import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddleWareSaga from "redux-saga";
import { DrawerReducer } from "./reducers/DrawerReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectCyberbugsReducer } from "./reducers/ProjectCyberbugsReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
import {TaskTypeReducer} from "./reducers/TaskTypeReducer";
import {PriorityReducer} from "./reducers/PriorityReducer";
import {StatusReducer} from "./reducers/StatusReducer"
import { rootSaga } from "./sagas/rootSaga";
import {TaskReducer} from "./reducers/TaskReducer";

const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberbugsReducer,
    DrawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer
})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;