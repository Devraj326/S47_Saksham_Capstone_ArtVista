import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import scss from './SetUser.module.css';

function SetUser() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [existingUsernames, setExistingUsernames] = useState([]);
  const email = localStorage.getItem('UserEmail');

  const navigateTo = useNavigate();

  const UserName = localStorage.getItem('Username');

  useEffect(() => {
    fetchExistingUsernames();
  }, []);

  const fetchExistingUsernames = async () => {
    try {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND}/useravail`);
      setExistingUsernames(response.data);
    } catch (error) {
      console.error('Error fetching existing usernames:', error);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    setMessage('This username is availabe');
    checkUsernameAvailability(e.target.value);
  };

  const checkUsernameAvailability = (newUsername) => {
    if (existingUsernames.includes(newUsername)) {
      setError('Username is already taken. Please choose a different username.');
      setMessage('');
    } else {
      setError('');
    }
  };

  const handleSubmit = async () => {
    try {
      localStorage.setItem('Username', username);
      navigateTo('/');
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND}/setuser`, { username, email: email });
      setMessage(response.data.message);
      const token = response.data.token;
      localStorage.setItem('UserToken', token);
      setError('');
    } catch (error) {
      console.error('Error setting username:', error);
      setMessage('');
      setError(error.response?.data.message || 'An error occurred');
    }
  };

  return (
    <>
    <div className={scss.fullpage}>
    <button className={scss.Backbtn} onClick={() => navigateTo('/auth/editauth')}>{"< Back"}</button>
      <div className={scss.formcont}>
      <form className={scss.form}>
        <div className={scss.title}>Set your Username</div>
        <div className={scss.msg}><p>You have logged in as</p><pe>{email}</pe></div>
        {
          UserName ? 
          <div className={scss.msg}><p>Your current Username is:</p><pe>{UserName}</pe></div> 
          : 
          <div>You have not set your username yet</div>
        }
        <div className={scss.inputcont}>
          <input
          className={scss.inputuser}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            />
            {!error && username && <button onClick={handleSubmit}>Use this ?</button>}
        </div>
        {error && <div className={scss.message} style={{ color: 'red' }}>{error}</div>}
        {!error && username && <div className={scss.message} style={{ color: 'green' }}>Username available</div>}
      </form>
      </div>
    </div>
    </>
  );
}

export default SetUser;
