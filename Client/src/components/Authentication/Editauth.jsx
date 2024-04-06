import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import lcss from './css/EditAuth.module.css'

// posts import
import UserPosts from '../pages/UserPosts'
// username manual set
import SetUser from './components/SetUser'


function Editauth() {

  const navigateTo = useNavigate();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  function handleGGLogout() {
    localStorage.removeItem('Username');
    localStorage.removeItem('loggedInUser'); 
    logout({ returnTo: window.location.origin });
  }

  const handleLogout = () => {
    Axios.post(import.meta.env.VITE_USERLOGOUT, {
    }).then((response) => {
      console.log(response);
      navigateTo('/auth/login');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('Username');
      localStorage.removeItem('UserToken');
      localStorage.removeItem('UserEmail');
    }).catch((error) => {
      console.log(error);
      console.log('Logout failed');
      alert('Error while logout');
    })
  }

  const loggedInUser = localStorage.getItem('loggedInUser');
  const userObject = loggedInUser ? JSON.parse(loggedInUser) : null;
  const username = userObject ? userObject.username : 'Guest';

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <>
          Hello {user.name}!
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <div>
            <button className={lcss.logout} onClick={handleGGLogout}>
              Logout 
            </button>
          </div>
        </>
      ) : (
          <div>
            <p> hello ! {username} !</p>
            <button className={lcss.logout} onClick={handleLogout}>Logout</button>
          </div>
      )}
      <UserPosts />
    </>
  )
}

export default Editauth