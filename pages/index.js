import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (email === 'user@example.com' && password === 'password123') {
      localStorage.setItem('signedIn', 'true');
      localStorage.setItem('userEmail', email); 
      router.push('/dashboard');
    } else {
        localStorage.setItem('signedIn', 'true');
        localStorage.setItem('userEmail', email); 
        router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">🌟 Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-left text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
