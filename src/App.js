import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';




import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { checkLoggedIn } from './components/user/UserFunctions';
import AuthContext from './context/authContext';
import NavBar from './components/navigation/NavBar';
import MySpinner from './components/hoc/Spinner'
const Profile = React.lazy(() => import('./components/user/Profile'));
const Landing = React.lazy(() => import('./components/landing/Landing'));
const Login = React.lazy(() => import('./components/user/Login'));
const Register = React.lazy(() => import('./components/user/Register'));
const addProjects = React.lazy(() => import('./components/projects/addProject'));
const SingleProject = React.lazy(() => import('./components/projects/singleProject'));




function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);


  const checkUser = async () => {
    await checkLoggedIn(setUserLoggedIn)
  }
  // eslint-disable-next-line
  useEffect(() => {
    checkUser()
  }, [])



  return (

    <BrowserRouter>
      <div className="App">
        <AuthContext.Provider
          value={{
            userLoggedIn: userLoggedIn,
            userData: userLoggedIn ? jwt_decode(localStorage.user_login) : {},
            setUserLoggedIn: setUserLoggedIn
          }}>
          <NavBar />
          <Route render={({ location }) => (
            <Suspense fallback={<MySpinner />}>
              <Switch location={location}>
                <Route path="/" exact component={Landing} />
                <Route path="/login" render={(props) => <Login setUserLoggedIn={setUserLoggedIn} {...props} />} />
                <Route path="/register" exact component={Register} />
                <Route path="/projects/add" exact component={addProjects} />
                <Route path="/project/:projectname" exact component={SingleProject} />
                <Route path="/profile/:username" exact component={Profile} />
                <Route path="/profile" exact component={Profile} />
              </Switch>
            </Suspense>
          )} />
        </AuthContext.Provider>

      </div >
    </BrowserRouter>

  );
}

export default App;
