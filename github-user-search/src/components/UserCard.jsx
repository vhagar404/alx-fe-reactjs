// src/components/UserCard.jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} width={120} />
      <h3>{user.login}</h3>
      {user.name && <p>{user.name}</p>}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-profile"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default UserCard;