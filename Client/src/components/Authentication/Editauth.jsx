import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

// posts import
import UserPosts from '../pages/UserPosts'


function Editauth() {

  const navigateTo = useNavigate();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  function handleGGLogout() {
    localStorage.removeItem('loggedInUser'); 
    logout({ returnTo: window.location.origin });
  }

  const handleLogout = () => {
    Axios.post(import.meta.env.VITE_USERLOGOUT, {
    }).then((response) => {
      console.log(response);
      navigateTo('/auth/login');
      localStorage.removeItem('loggedInUser');
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
            <button onClick={handleGGLogout}>
              Log Out Google
            </button>
            {/* Set Username functionality to be implemented*/}
            <button>
              SetUsername
            </button>
          </div>
        </>
      ) : (
          <div>
            <p> hello ! {username} !</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
      )}
      <UserPosts />
    </>
  )
}

export default Editauth