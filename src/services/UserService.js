import { baseService } from "./baseService";

export class UserService extends baseService{
    getUser = (keyword) =>{
        return this.get(`Users/getUser?keyword=${keyword}`)
    }

    assignUserProject = (userProject) =>{
        return this.post(`Project/assignUserProject`,userProject)
    }
    deleteUserFromProject = (userProject) => {
        return this.post("Project/removeUserFromProject",userProject)
    }

    getUserByProjectId = (projectId) =>{
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
}

export const userService = new UserService()