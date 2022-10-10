import { USER_SIGNIN_API } from "../constants/CyberBugs/CyberBugs";

export const signinCyberBugsAction = (email,password) => ({
  type: USER_SIGNIN_API,
  userLogin:{
    email:email,
    password:password
  }
})
