import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Navbar from '../Navbar/Navbar';
import Register from '../Register/Register';
import Tvshows from '../Tvshows/Tvshows';
import Home from './../Home/Home';
import { Redirect, Route, Switch, useHistory } from "react-router";
import { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Notfound from '../Notfound/Notfound';
import People from './../People/People';
import MovieDetails from './../MovieDetails/MovieDetails';
import TvDetails from '../TvDetails/TvDetails';
import PeopleDetails from '../PeopleDetails/PeopleDetails';

function App ()
{
  let history = useHistory();

  let [ loginData, setLoginData ] = useState( null );

  function getUserData ()
  {
    let userData = JSON.parse( localStorage.getItem( 'userData' ) );
    setLoginData( userData );
  }

  function logout ()
  {
    localStorage.removeItem( 'userData' );
    setLoginData( null );
    history.push( '/login' );
  }

  useEffect( () =>
  {
    if ( localStorage.getItem( 'userData' ) )
    {
      getUserData();
    }
  }, [] );

  return (
    <div className="App">
      <Navbar loginData={ loginData } logout={ logout } />
      <div className="container">
        <Switch>
          <Redirect exact from='/' to='/home' />
          <ProtectedRoute path='/home' component={ Home } />
          <ProtectedRoute path='/movies' component={ Movies } />
          <ProtectedRoute path='/people' component={ People } />
          <ProtectedRoute path='/tvshow' component={ Tvshows } />
          <Route path='/:details/:id/' component={ MovieDetails } />
          <Route path='/:details/:id/' component={ TvDetails } />
          <Route path='/:details/:id/' component={ PeopleDetails } />
          <Route path='/login' render={ ( props ) => <Login getUserData={ getUserData } { ...props } /> } />
          <Route path='/register' render={ ( props ) => <Register  { ...props } /> } />
          <Route path='*' component={Notfound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
