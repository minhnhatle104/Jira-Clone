import React,{useEffect} from 'react'
import ContentMain from '../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../components/Cyberbugs/Main/InfoMain'
import {GET_PROJECT_DETAIL_SAGA} from "../redux/constants/CyberBugs/CyberBugs"
import {useSelector,useDispatch} from "react-redux"

export default function IndexCyberbugs(props) {
  const {projectDetail} = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch()

  useEffect(()=>{
    // Khi người dùng link qua trang này bằng thẻ NavLink hoặc gõ url thì ta
    // sẽ lấy tham số từ url => get saga
    const projectId = props.match.params.projectId

    dispatch({
      type:GET_PROJECT_DETAIL_SAGA,
      projectId
    })
  },[])

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail}/>
      <ContentMain projectDetail={projectDetail}/>
    </div>
  )
}
