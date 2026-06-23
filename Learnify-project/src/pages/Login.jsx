import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('Treasure');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto w-full max-w-md">
        <div className="flex justify-center text-blue-600 mb-2">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl">
            <BookOpen size={28} className="fill-current" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900">Sign in to Learnify</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Simulate dashboard authentication flow</p>
      </div>

      <div className="mt-8 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Student Name</label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                🔑 Note: No password or email is required. Only your Student Name is needed to sign in.
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Enter Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}