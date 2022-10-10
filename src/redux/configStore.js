import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddleWareSaga from "redux-saga";
import { HistoryReducer } from "./reducers/HistoryReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
import { rootSaga } from "./sagas/rootSaga";

const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer
})

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;