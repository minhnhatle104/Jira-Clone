import Axios from "axios"
import { DOMAIN_CYBERBUGS } from "../util/constants/settingSystem"

export const  cyberBugsService = {
    signInCyberbugs:(userLogin)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/users/signin`,
            method:"POST",
            data:userLogin
        })
    }
}