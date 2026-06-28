import React, { useState } from 'react';
import { 
  BookOpen, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  Loader2,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'tutor'

  const getRoleForEmail = (emailStr) => {
    const cleaned = emailStr.toLowerCase().trim();
    if (cleaned === 'tutor@learnify.edu') return 'tutor';
    if (cleaned === 'student@learnify.edu') return 'student';
    return localStorage.getItem(`user_role_${cleaned}`) || null;
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSignUp) {
      const targetRole = getRoleForEmail(email);
      if (targetRole && targetRole !== role) {
        setError(`Access Denied: This email is registered as a ${targetRole === 'tutor' ? 'Tutor' : 'Student'}. Please switch portals to sign in.`);
        setLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save role association
        localStorage.setItem(`user_role_${email.toLowerCase().trim()}`, role);
        
        // Update display name
        await updateProfile(user, {
          displayName: name || (role === 'tutor' ? 'Tutor' : 'Student')
        });
        onLogin(user.displayName || (role === 'tutor' ? 'Tutor' : 'Student'), role);
      } else {
        // Sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem(`user_role_${email.toLowerCase().trim()}`, role);
        onLogin(user.displayName || user.email.split('@')[0], role);
      }
    } catch (err) {
      console.error(err);
      // Clean up error message
      let message = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const targetRole = getRoleForEmail(user.email);
      if (targetRole && targetRole !== role) {
        setError(`Access Denied: This Google account is registered as a ${targetRole === 'tutor' ? 'Tutor' : 'Student'}. Please switch portals to sign in.`);
        await signOut(auth);
        setLoading(false);
        return;
      }
      
      localStorage.setItem(`user_role_${user.email.toLowerCase().trim()}`, role);
      onLogin(user.displayName || user.email.split('@')[0], role);
    } catch (err) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-slate-100/80 rounded-3xl shadow-xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/20 mb-3">
            <BookOpen size={28} className="fill-current" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Learnify</h2>
          <p className="mt-1.5 text-center text-sm text-slate-500">
            {isSignUp 
              ? (role === 'tutor' ? 'Create your tutor account' : 'Create your student account') 
              : (role === 'tutor' ? 'Sign in to your instructor portal' : 'Sign in to access your student dashboard')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              !isSignUp 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              isSignUp 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="mb-6 bg-slate-100/60 p-1 rounded-xl flex gap-1">
          <button
            type="button"
            onClick={() => { setRole('student'); setError(''); }}
            className={`flex-1 py-1.5 px-3 flex items-center justify-center gap-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/10'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap size={14} />
            Student
          </button>
          <button
            type="button"
            onClick={() => { setRole('tutor'); setError(''); }}
            className={`flex-1 py-1.5 px-3 flex items-center justify-center gap-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
              role === 'tutor'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200/10'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles size={14} />
            Tutor
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-start gap-2.5 text-sm">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <User size={18} />
                </span>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Treasure"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl shadow-sm text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 relative flex items-center justify-center">
          <div className="absolute w-full border-t border-slate-100"></div>
          <span className="relative bg-white/90 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2.5 py-2.5 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <FcGoogle size={18} />
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}