import { CHANGE_TASK_MODAL, GET_TASK_DETAIL } from "../constants/CyberBugs/TaskConstants"

const initialState = {
    taskDetailModal:{
      "priorityTask": {
        "priorityId": 2,
        "priority": "Medium"
      },
      "taskTypeDetail": {
        "id": 2,
        "taskType": "new task"
      },
      "assigness": [
        {
          "id": 1024,
          "avatar": "https://ui-avatars.com/api/?name=zoro",
          "name": "zoro",
          "alias": "le-ngoai-ngu"
        },
        {
          "id": 1027,
          "avatar": "https://ui-avatars.com/api/?name=fuk you",
          "name": "fuk you",
          "alias": "khai"
        }
      ],
      "lstComment": [],
      "taskId": 6440,
      "taskName": "Learn Golang",
      "alias": "learn-golang",
      "description": "<p>This is the Joker</p>",
      "statusId": "2",
      "originalEstimate": 5,
      "timeTrackingSpent": 4,
      "timeTrackingRemaining": 2,
      "typeId": 2,
      "priorityId": 2,
      "projectId": 8568
    }
}

export const TaskReducer= (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL:{
            return {...state,taskDetailModal:action.taskDetailModal}
        }
        case CHANGE_TASK_MODAL:{
          const{name,value} = action
          return {...state,taskDetailModal:{...state.taskDetailModal,[name]:value}}
        }
        default:
            return state
    }
}
