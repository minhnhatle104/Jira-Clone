import Axios from "axios"
import { DOMAIN_CYBERBUGS } from "../util/constants/settingSystem"

export const  cyberBugsService = {
    signInCyberbugs:(userLogin)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/users/signin`,
            method:"POST",
            data:userLogin
        })
    },
    getAllProjectCategory:()=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method:"GET"
        })
    },
    createProject:(newProject)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/Project/createProject`,
            method:"POST",
            data:newProject
        })
    }
}