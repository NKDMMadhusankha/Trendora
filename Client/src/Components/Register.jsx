import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo2.png';
import axios from 'axios';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div
      className={`fixed top-8 right-8 z-50 px-6 py-3 rounded-lg shadow-lg text-center font-medium transition-all duration-500 transform ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'} animate-toast`}
      style={{ minWidth: '220px', maxWidth: '90vw' }}
    >
      {message}
    </div>
  );
}

// Add animation styles for toast
if (!document.getElementById('toast-anim-style')) {
  const style = document.createElement('style');
  style.id = 'toast-anim-style';
  style.innerHTML = `
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(-40px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-toast {
      animation: toast-in 0.4s cubic-bezier(0.4,0,0.2,1);
    }
  `;
  document.head.appendChild(style);
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match!', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      setSuccess(res.data.message || 'Registration successful!');
      setToast({ message: res.data.message || 'Registration successful!', type: 'success' });
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        navigate('/login'); // Redirect to Login page after registration
      }, 1200); // Wait for toast to show
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setToast({ message: err.response?.data?.message || 'Registration failed.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-zinc-800">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={Logo} alt="Trendora" className="h-9 mx-auto mb-4" />
            <p className="text-zinc-400">Sign up to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Trendora User"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="you@trendora.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 mt-1 rounded bg-zinc-800 border-zinc-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-zinc-400">
                I agree to the{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400 transition">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500 hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Feedback messages */}
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-2">{success}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-500">Or sign up with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
    </div>
  );
}