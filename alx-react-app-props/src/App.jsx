// src/components/App.jsx

import { UserContext } from "./components/UserContext";          // same folder
import ProfilePage from "./components/ProfilePage";             // same folder

function App() {
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com"
  };

  return (
    <UserContext.Provider value={userData}>
      <div style={{ padding: '20px' }}>
        <h1>Profile Application</h1>
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}

export default App;
