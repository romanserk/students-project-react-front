import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actionType from './store/actions'
import axios from './axios-rls'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { checkLoggedIn } from './components/user/UserFunctions';
import NavBar from './components/navigation/NavBar';
import MySpinner from './components/hoc/Spinner';
import NotFoundPage from './components/pageError/NotFoundPage';
const Profile = React.lazy(() => import('./components/user/Profile'));
const Landing = React.lazy(() => import('./components/landing/Landing'));
const SearchResults = React.lazy(() => import('./components/landing/searchResults'));
const Login = React.lazy(() => import('./components/user/Login'));
const Register = React.lazy(() => import('./components/user/Register'));
const addProjects = React.lazy(() => import('./components/projects/addProject'));
const SingleProject = React.lazy(() => import('./components/projects/singleProject'));




const App = (props) => {


  const checkUser = async () => {
    await checkLoggedIn(props.setLoggedIn, props.setUserData)
  }

  const countVisitor = () => {

    const currD = new Date();
    const date = `date: D${currD.getDate()}-M${currD.getMonth() + 1}-Y${currD.getFullYear()} time: ${currD.getHours()}:${currD.getMinutes()}:${currD.getSeconds()} timeZone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`

    const visitor = {
      ip: '',
      date: date,
      website: 'students projects'
    }

    let exists = false

    axios(`https://ipapi.co/json/`)
      .then(response => {
        visitor.ip = response.data.ip
        axios.get(`${process.env.REACT_APP_API_FIREBASE_DATABASE}/visitors.json`)
          .then(response => {
            const data = response.data;
            Object.keys(data).forEach(val => {
              if (data[val].ip === visitor.ip && data[val].website === visitor.website) {
                exists = true
              }
            })
            if (!exists) axios.post('/visitors.json', visitor)
          })

      });

  }

  useEffect(() => {
    checkUser();
    countVisitor()
    // eslint-disable-next-line
  }, [])



  return (
    <div>
      <BrowserRouter>
        <div className="App">

          <NavBar />
          <Route render={({ location }) => (
            <Suspense fallback={<MySpinner />}>
              <Switch location={location}>
                <Route path="/" exact component={Landing} />
                <Route path="/results/:params" exact component={SearchResults} />
                <Route path="/login" render={(props) => <Login  {...props} />} />
                <Route path="/register" exact component={Register} />
                <Route path="/projects/add" exact component={addProjects} />
                <Route path="/project/:projectname" exact component={SingleProject} />
                <Route path="/profile/:username" exact component={Profile} />
                <Route path="/profile" exact component={Profile} />
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Suspense>
          )} />


        </div >
      </BrowserRouter>
    </div>


  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.isLoggedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: (isLogged) => dispatch({ type: actionType.SET_LOGGED_IN, isLogged: isLogged }),
    setUserData: (userData) => dispatch({ type: actionType.SET_USER_DATA, userData: userData }),
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
