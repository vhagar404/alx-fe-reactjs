import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './UserProfile';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile
        name="John Doe"
        age={28}
        bio="A passionate traveler and city explorer."
      />
      <Footer />
    </div>
  );
}

export default App;




