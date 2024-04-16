// import React, { useState , useEffect} from 'react'
// import { useAuth0 } from '@auth0/auth0-react';
// import { useNavigate } from 'react-router-dom';
// import gcss from './gauth.module.css'
// import Axios from 'axios';


// function gauth() {
//   const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, isLoading  } = useAuth0();
//   const navigateTo = useNavigate();
//   function loginWithGoogle() {
//     loginWithRedirect({
//       connection: 'google-oauth2',
//     });
//   }

//   useEffect(() => {
//     if (isAuthenticated && isLoading) {
//       handleRedirectCallback();
//     }
//   }, [isAuthenticated, isLoading, getAccessTokenSilently, navigateTo, user]);

//   useEffect(() => {
//     const handleRedirectCallback = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently();
//         console.log("user logged in successfully !", user.email);
//         localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, token: accessToken }));
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('UserEmail', user.email);
//         // navigateTo('/');

//         try {
//           const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/checkuser`, { email: user.email });
//           console.log(response);
//           if (response.status === 200) {
//             console.log('details matched');
//             localStorage.setItem('Username', response.data.message);
//             localStorage.setItem('UserToken', response.data.token);
//             navigateTo('/');
//           } else if(response.status === 214 || response.status === 215) {
//             navigateTo('/auth/config/setuser');
//             console.log('Redirection should happen');
//           }
//       } catch (error) {
//           console.error('some unexpected error', error);
//       }
      
//       } catch (error) {
//         console.error('Error during redirect callback:', error.message);
//       }
//     };

//     if (!isLoading && isAuthenticated) {
//       handleRedirectCallback();
//     }
//   }, [getAccessTokenSilently, isLoading, isAuthenticated, navigateTo, user]);
//   return (
//     <>
//     <button className={gcss.googlebutton} onClick={() => loginWithGoogle()} >Continue with Google</button>
//     </>
//   )
// }

// export default gauth

import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import gcss from './gauth.module.css';
import handleRedirectCallback from './handleCallback'; // Adjust the import path as needed

function gauth() {
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const navigateTo = useNavigate();

  const loginWithGoogle = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleRedirectCallback(user, getAccessTokenSilently, navigateTo);
    }
  }, [getAccessTokenSilently, isLoading, isAuthenticated, navigateTo, user]);

  return (
    <>
      {!isAuthenticated && (
        <button className={gcss.googlebutton} onClick={loginWithGoogle}>
          Continue with Google
        </button>
      )}
    </>
  );
}

export default gauth;
