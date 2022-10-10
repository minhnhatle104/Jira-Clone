import {  Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoadingComponent from "./../src/components/GlobalSetting/LoadingComponent/LoadingComponent"
import {useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import Home from './pages/Home/Home';

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
        <Route exact path="/home" component={Home}/>
        <UserLoginTemplate exact path="/login" Component={Login}/>
      </Switch>
    </>
  );
}

export default App;
