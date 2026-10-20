import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ClassSchedule from './components/ClassSchedule';
import TrainerBio from './components/TrainerBio';
import MembershipPlans from './components/MembershipPlans';
import Footer from './components/Footer';

function App() {
  const [trainerFilter, setTrainerFilter] = useState('All');
  const [ratings, setRatings] = useState({});
  const [sessions, setSessions] = useState({});

  function handleRating(trainerId, value) {
    setRatings((prev) => ({ ...prev, [trainerId]: value }));
  }

  function handleSessionChange(trainerId, count) {
    setSessions((prev) => ({ ...prev, [trainerId]: count }));
  }

  return (
    <div className="bg-page text-text-primary min-h-screen overflow-x-hidden font-sans">
      <Header />
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
    </div>
  );
}

export default App;
