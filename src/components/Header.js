import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f1f1f1' }}>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>
  );
};

export default Header;
