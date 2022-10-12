import {  Switch, useHistory } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoadingComponent from "./../src/components/GlobalSetting/LoadingComponent/LoadingComponent"
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import indexCyberbugs from "./pages/indexCyberbugs"
import CreateProject from './pages/CreateProject/CreateProject';

function App() {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch({
      type:"ADD_HISTORY",
      history:history
    })
  },[])

  return (
    <>
      <LoadingComponent/>
      <Switch>
        <CyberbugsTemplate exact path="/home" Component={indexCyberbugs}/>
        <CyberbugsTemplate exact path="/createproject" Component={CreateProject}/>
        <UserLoginTemplate exact path="/login" Component={Login}/>
      </Switch>
    </>
  );
}

export default App;
