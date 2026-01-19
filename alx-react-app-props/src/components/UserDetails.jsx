import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserDetails() {
  const userData = useContext(UserContext);

  // Optional: handle case where context might be null
  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
}

export default UserDetails;