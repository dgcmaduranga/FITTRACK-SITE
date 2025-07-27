import React from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 Profile</h2>

      {currentUser ? (
        <div className="card shadow-sm p-4">
          <h5 className="card-title">User Info</h5>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>UID:</strong> {currentUser.uid}</p>
        </div>
      ) : (
        <div className="alert alert-warning">Not logged in.</div>
      )}
    </div>
  );
}

export default ProfilePage;
