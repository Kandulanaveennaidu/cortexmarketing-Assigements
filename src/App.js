import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IconContext } from 'react-icons';
import { RiUserSettingsLine } from 'react-icons/ri';
import UserManagement from './components/UserManagement';
import usersReducer from './userSlice';
import './App.css';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <h1>User Management</h1>
        <IconContext.Provider value={{ className: 'custom-icon' }}>
          <RiUserSettingsLine />
        </IconContext.Provider>
        <UserManagement />
      </div>
    </Provider>
  );
};

export default App;
