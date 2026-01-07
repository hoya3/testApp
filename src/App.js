import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Login />
      </main>
      <Footer />
    </div>
  );
}

export default App;