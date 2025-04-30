import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [signedInMessage, setSignedInMessage] = useState(''); 
  const router = useRouter();

  useEffect(() => {
    const isSignedIn = localStorage.getItem('signedIn');
    if (!isSignedIn) {
      router.push('/');
      return;
    }

    setSignedInMessage('You are signed in successfully!'); 

    fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.content); 
        setLoading(false);
      })
      .catch((err) => {
        console.error('API error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📊 Dashboard</h1>

        {signedInMessage && (
          <p className="text-lg text-green-600 mb-6">{signedInMessage}</p>
        )}

        {quote && <p className="text-lg italic text-gray-700 mb-6">"{quote}"</p>}

        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={() => {
            localStorage.removeItem('signedIn');
            localStorage.removeItem('userEmail');
            router.push('/');
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
