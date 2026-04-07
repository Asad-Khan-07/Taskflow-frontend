import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, LogOut, User, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export default function Navbar({ boardTitle }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <nav className="h-14 glass-dark border-b border-white/5 flex items-center px-4 gap-4 relative z-50">
      <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span className="font-display font-bold text-white text-lg hidden sm:block">TaskFlow</span>
      </Link>

      {boardTitle && (
        <>
          <span className="text-slate-600">/</span>
          <span className="font-display font-semibold text-slate-200 truncate max-w-xs">{boardTitle}</span>
        </>
      )}

      <div className="ml-auto relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-violet flex items-center justify-center text-xs font-bold text-white font-mono">
            {initials}
          </div>
          <span className="text-sm text-slate-300 font-body hidden sm:block">{user?.name}</span>
          <ChevronDown size={14} className="text-slate-500" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl overflow-hidden shadow-xl shadow-black/40 animate-fade-in">
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs text-slate-500 font-body">Signed in as</p>
              <p className="text-sm font-medium text-slate-200 truncate font-body">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-accent-rose hover:bg-accent-rose/10 transition-colors font-body"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        )}
      </div>

      {menuOpen && <div className="fixed inset-0 z-[-1]" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
