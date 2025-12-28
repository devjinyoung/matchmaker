import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import type { ProfileData } from '../types';
import { useProfile } from '../hooks/useProfile';

function Login() {
  const { createProfile } = useProfile();
  const [mode, setMode] = useState<'login' | 'signup' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const navigate = useNavigate();

  const defaultProfileData: ProfileData = {
    name: '',
    age: '',
    location: '',
    bio: '',
    profileImage: 'https://via.placeholder.com/200',
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual authentication logic here
    navigate('/home');
  };

  const handleSignUpCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && signupPassword) {
      setShowProfileForm(true);
    }
  };

  const handleSignUpSave = async (data: ProfileData) => {
    const res = await createProfile(email, signupPassword, data);
    if (res.success) {
      navigate('/home');
    } else {
      console.error('Sign up failed:', res.error);
      alert(`Sign up failed: ${res.error}`);
    }
  };

  const handleSignUpCancel = () => {
    setMode(null);
    setShowProfileForm(false);
    setEmail('');
    setSignupPassword('');
  };

  if (mode === null) {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Matchmaker app</h1>
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => setMode('login')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'login') {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Login</h1>
        <form onSubmit={handleLoginSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (mode === 'signup') {
    if (!showProfileForm) {
      return (
        <div>
          <h1 className="text-3xl font-bold underline">Sign Up</h1>
          <form onSubmit={handleSignUpCredentials} className="mt-4 space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={() => setMode(null)}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-3xl font-bold underline">Sign Up - Profile</h1>
        <div className="mt-4">
          <ProfileForm
            profileData={defaultProfileData}
            onSave={handleSignUpSave}
            onCancel={handleSignUpCancel}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default Login;
