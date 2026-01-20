// src/components/UserProfile.jsx
import { useContext } from 'react';
import UserContext from './UserContext';  // default import, as we fixed earlier

function UserProfile() {
  const userData = useContext(UserContext);

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      maxWidth: '400px', 
      margin: '20px auto',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default UserProfile;