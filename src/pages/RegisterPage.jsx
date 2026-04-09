import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } },
};

const orbVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
};

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [focusedField, setFocusedField] = useState(null);
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    try {
      await register(form);
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-surface-900 flex items-center justify-center p-4 relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none"
        variants={orbVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div
        className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"
        variants={orbVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      />

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div className="inline-flex items-center gap-2 mb-4" variants={logoVariants}>
            <motion.div
              className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Zap size={20} className="text-white" />
            </motion.div>
            <span className="font-display text-2xl font-bold text-white">TaskFlow</span>
          </motion.div>

          <motion.h1 className="font-display text-3xl font-bold text-white mb-1" variants={itemVariants}>
            Create account
          </motion.h1>
          <motion.p className="text-slate-400 font-body" variants={itemVariants}>
            Start managing your tasks like a pro
          </motion.p>
        </motion.div>

        {/* Card */}
        <motion.div className="glass rounded-2xl p-8" variants={itemVariants}>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'name' ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'email' ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <motion.div
                className="relative"
                animate={{ scale: focusedField === 'password' ? 1.01 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  className="input-field pl-10"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
                whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {loading ? (
                    <motion.span
                      key="loading"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      Create account
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>

          <motion.p className="text-center text-slate-400 text-sm mt-6" variants={itemVariants}>
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}