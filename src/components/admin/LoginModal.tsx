import React, { useState } from 'react';
import { X, Palmtree, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  onLogin: (username: string, password: string) => boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulazione delay di autenticazione
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = onLogin(username, password);
    
    if (!success) {
      setError('Credenziali non valide');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-teal-800/90 to-emerald-800/90 backdrop-blur-sm rounded-xl border border-teal-400/30 w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-teal-400/30">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
              <Palmtree className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Admin Login</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-teal-200 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Inserisci username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-teal-700/50 border border-teal-400/30 rounded-lg text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Inserisci password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-300 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-teal-700/50 text-teal-200 rounded-lg hover:bg-teal-600/50 transition-colors border border-teal-400/30"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Accesso...' : 'Accedi'}
            </button>
          </div>
        </form>

        <div className="px-6 pb-6">
          <div className="bg-teal-700/30 rounded-lg p-3 border border-teal-400/20">
            <p className="text-xs text-teal-200 mb-1">Credenziali demo:</p>
            <p className="text-xs text-teal-100">Username: <span className="font-mono">admin</span></p>
          <p className="text-xs text-teal-100">Username: <span className="font-mono">Developer</span></p>
          <p className="text-xs text-teal-100">Password: <span className="font-mono">Developer123</span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;