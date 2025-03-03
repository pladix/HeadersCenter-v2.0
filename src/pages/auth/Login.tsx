import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, LogIn, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signInAnon } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      setLoading(true);
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnonymousLogin = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInAnon();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in anonymously');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="h-10 w-10 text-indigo-500" />
            <h1 className="text-2xl font-bold text-white ml-2">Headers Center <span className="text-indigo-400">2.0</span></h1>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-6 text-center">Sign in to your account</h2>
          
          {error && (
            <div className="mb-4 bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <button
              className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center"
              onClick={handleAnonymousLogin}
              disabled={loading}
            >
              <User className="h-5 w-5 mr-2" />
              Anonymous Access
            </button>
          </div>
          
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;