import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserLoginTemplate exact path="/login" Component={Login}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
