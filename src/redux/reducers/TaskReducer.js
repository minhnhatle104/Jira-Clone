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
            "id": 1027,
            "avatar": "https://ui-avatars.com/api/?name=fuk you",
            "name": "fuk you",
            "alias": "khai"
          },
          {
            "id": 862,
            "avatar": "https://ui-avatars.com/api/?name=Trần Vinh",
            "name": "Trần Vinh",
            "alias": "crystal"
          }
        ],
        "lstComment": [],
        "taskId": 6378,
        "taskName": "Learn Golang",
        "alias": "learn-golang",
        "description": "<p>Hhihihiaf</p>",
        "statusId": "3",
        "originalEstimate": 5,
        "timeTrackingSpent": 5,
        "timeTrackingRemaining": 3,
        "typeId": 2,
        "priorityId": 2,
        "projectId": 8486
      }
}

export const TaskReducer= (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}
