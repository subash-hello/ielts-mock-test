import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import type { AdminUser } from '../../types/consultancy';
import { ConsultancyService } from '../../services/consultancyService';

interface AdminLoginViewProps {
  initialEmail?: string;
  onSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  initialEmail = '',
  onSuccess,
  onCancel
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = ConsultancyService.authenticateAdmin(email, password);
      setIsLoading(false);

      if (result.success && result.user) {
        if (!rememberMe) {
          // If not remembering, we still keep it in memory for the current tab session
        }
        onSuccess(result.user);
      } else {
        setErrorMessage(result.error || 'Invalid administrator email or password.');
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1 shadow-xs shrink-0">
            <img
              src="/images/masterieltsai-icon.png"
              alt="Master IELTS AI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-sm text-slate-900 tracking-tight uppercase">
                MOCK TEST <span className="font-normal text-xs text-slate-500 lowercase">from</span> Master IELTS AI
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Admin Center
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Administrative Control Center Authentication
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 transition cursor-pointer shadow-xs"
        >
          ← Return to Test Hub
        </button>
      </header>

      {/* Login Card Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-slate-200 max-w-md w-full p-5 sm:p-8 rounded-2xl shadow-sm space-y-5 sm:space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-200 bg-white p-1.5 shadow-sm mx-auto mb-1">
              <img
                src="/images/masterieltsai-icon.png"
                alt="Master IELTS AI"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-0.5">
              <span className="font-extrabold text-slate-900 uppercase tracking-tight">MOCK TEST</span>
              <span>from <a href="https://masterieltsai.com" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline">Master IELTS AI</a></span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Admin Portal Sign In
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your authorized email address and password to access the platform administration portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email Field */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Administrator Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 pl-10 pr-4 py-2.5 rounded-lg outline-none text-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-slate-700 font-semibold block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-white border border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-900 pl-10 pr-10 py-2.5 rounded-lg outline-none text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Remember session on this device</span>
              </label>
              <span className="text-[11px] text-blue-600 font-medium">
                Encrypted Session
              </span>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs leading-relaxed">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs rounded-lg transition cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>


        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-2.5 text-center text-xs text-slate-500">
        IELTS Educational Consultancy Administration Network • Secure Access Portal
      </footer>
    </div>
  );
};

export default AdminLoginView;
