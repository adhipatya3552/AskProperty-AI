import { Home } from './components/Home';
import { About } from './components/About';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Particles from './components/Particles';
import LoginModal from './components/modals/LoginModal';
import SignupModal from './components/modals/SignupModal';
import { ModalsProvider } from './context/ModalsContext';

function App() {
  return (
    <ModalsProvider>
      <div className="app min-h-screen bg-gray-50 flex flex-col scroll-smooth">
        <Particles />
        <Header />
        <main className="flex-grow">
          <Home />
          <About />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
        <LoginModal />
        <SignupModal />
      </div>
    </ModalsProvider>
  );
}

export default App;