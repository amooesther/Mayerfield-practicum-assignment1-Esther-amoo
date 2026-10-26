import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setFormError('');
    setSuccessMessage('');
  };

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (tab === 'signup') {
        if (!name.trim()) throw new Error('Please enter your name');
        if (!email.trim()) throw new Error('Please enter your email');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');

        await signup({ name: name.trim(), email: email.trim(), password });
        setSuccessMessage('Account created! Please sign in with your credentials.');
        setTab('login');
        setPassword('');
      } else {
        if (!email.trim() || !password) throw new Error('Please enter both email and password');

        await login({ email: email.trim(), password });
        resetForm();
        onClose();
      }
    } catch (err) {
      setFormError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-5 right-5 text-text-muted hover:text-accent transition-colors text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-card-alt"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="text-2xl font-black tracking-tight mb-1">
            <span className="text-text-primary">Fit</span>
            <span className="text-accent">Zone</span>
          </div>
          <h2 id="auth-modal-title" className="text-lg font-bold text-text-primary">
            {tab === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-text-muted mt-1">
            {tab === 'login'
              ? 'Sign in to access your classes and bookings.'
              : 'Join the FitZone community today.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-lg bg-card-alt p-1 mb-6 border border-border">
          <button
            type="button"
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
              tab === 'login'
                ? 'bg-accent text-page shadow'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
              tab === 'signup'
                ? 'bg-accent text-page shadow'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-semibold">
            {successMessage}
          </div>
        )}

        {/* Error Alert */}
        {formError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            {formError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Esther Amoo"
                required
                className="w-full px-4 py-3 bg-[#121212] border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 bg-[#121212] border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-4 py-3 bg-[#121212] border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            {tab === 'signup' && (
              <span className="text-[11px] text-text-muted mt-1 block">
                Must be at least 6 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-accent text-page font-bold text-sm rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-2"
          >
            {isSubmitting
              ? 'Processing...'
              : tab === 'login'
              ? 'Sign In to FitZone'
              : 'Create Free Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;

