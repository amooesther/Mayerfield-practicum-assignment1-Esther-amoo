import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ClassSchedule from './components/ClassSchedule';
import TrainerBio from './components/TrainerBio';
import MembershipPlans from './components/MembershipPlans';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function App() {
  const [trainerFilter, setTrainerFilter] = useState('All');
  const [ratings, setRatings] = useState({});
  const [sessions, setSessions] = useState({});

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  const handleOpenAuth = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  function handleRating(trainerId, value) {
    setRatings((prev) => ({ ...prev, [trainerId]: value }));
  }

  function handleSessionChange(trainerId, count) {
    setSessions((prev) => ({ ...prev, [trainerId]: count }));
  }

  return (
    <AuthProvider>
      <div className="bg-page text-text-primary min-h-screen overflow-x-hidden font-sans">
        <Header onOpenAuth={handleOpenAuth} />
        <main>
          <Hero />
          <About />
          <ClassSchedule />
          <TrainerBio
            filter={trainerFilter}
            onFilterChange={setTrainerFilter}
            ratings={ratings}
            onRate={handleRating}
            sessions={sessions}
            onSessionChange={handleSessionChange}
          />
          <MembershipPlans />
        </main>
        <Footer />

        {/* Real Authentication Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialTab={authModalTab}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
