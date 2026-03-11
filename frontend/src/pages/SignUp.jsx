import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api';

const Icons = {
  Brain: () => <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13h4.5a2 2 0 0 1 0 4H15" /><path d="M12.5 13h-.5" /><path d="M17 17v.5a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-.5" /><path d="M9 13H4.5a2 2 0 0 1 0-4H9" /><path d="M11.5 13h.5" /></svg>,
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/signin', { state: { message: 'Account created! Please sign in.' } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-teal-500/30">
      {/* Background Glow */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none delay-500"></div>

      <div className="max-w-md w-full space-y-8 relative z-10 py-12 animate-fade-in-up">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-black text-white tracking-tighter uppercase">Create account</h2>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 sm:p-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm"
                placeholder="name@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Confirm
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl font-black text-lg hover:shadow-[0_20px_50px_rgba(20,184,166,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : 'Register Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-teal-400 hover:text-teal-300 font-bold underline underline-offset-4 decoration-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default SignUp;
