import { Link } from 'react-router-dom';
import { Zap, LayoutDashboard, CheckSquare, RefreshCw, Layers, Shield, Activity, ArrowRight, Copyright } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeInSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function StaggerGrid({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage() {
  const features = [
    { icon: <LayoutDashboard size={22} className="text-blue-400" />, bg: 'bg-blue-500/10', title: 'Visual boards', desc: 'Drag and drop cards across columns to track progress at a glance.' },
    { icon: <CheckSquare size={22} className="text-purple-400" />, bg: 'bg-purple-500/10', title: 'Task tracking', desc: 'Add details, due dates, and labels to every card so nothing is missed.' },
    { icon: <RefreshCw size={22} className="text-green-400" />, bg: 'bg-green-500/10', title: 'Real-time updates', desc: 'Changes reflect instantly — your team always sees the latest state.' },
    { icon: <Layers size={22} className="text-yellow-400" />, bg: 'bg-yellow-500/10', title: 'Multiple boards', desc: 'Create separate boards for each project, team, or workflow you manage.' },
    { icon: <Shield size={22} className="text-red-400" />, bg: 'bg-red-500/10', title: 'Secure by default', desc: 'JWT authentication keeps your data private and your account protected.' },
    { icon: <Activity size={22} className="text-teal-400" />, bg: 'bg-teal-500/10', title: 'Fast & lightweight', desc: 'Built with React and Node.js — blazing fast on any device or connection.' },
  ];

  const steps = [
    { n: '1', title: 'Create an account', desc: 'Sign up for free in seconds — no credit card needed.' },
    { n: '2', title: 'Create a board', desc: 'Set up a board for your project and add your first lists.' },
    { n: '3', title: 'Add cards & tasks', desc: 'Break down your work into cards and move them as you progress.' },
    { n: '4', title: 'Ship it', desc: 'Stay on top of every task and deliver projects on time.' },
  ];

  const kbCols = [
    { title: 'To Do', cards: [{ t: 'Design landing page', tag: 'Design', cls: 'bg-blue-500/15 text-blue-400' }, { t: 'Set up CI/CD', tag: 'DevOps', cls: 'bg-purple-500/15 text-purple-400' }] },
    { title: 'In Progress', cards: [{ t: 'Build auth system', tag: 'Backend', cls: 'bg-yellow-500/15 text-yellow-400' }, { t: 'Write API docs', tag: 'Docs', cls: 'bg-green-500/15 text-green-400' }] },
    { title: 'Done', cards: [{ t: 'Project setup', tag: 'Done', cls: 'bg-green-500/15 text-green-400' }, { t: 'Database schema', tag: 'Done', cls: 'bg-green-500/15 text-green-400' }] },
  ];

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 font-sans">

      {/* ── Navbar ── */}
      <motion.nav
        className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.08] bg-[#080b14]/95 backdrop-blur"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Zap size={18} className="text-white" />
          </motion.div>
          <span className="text-xl font-bold text-white tracking-tight">TaskFlow</span>
        </motion.div>

        <motion.div
          className="flex gap-2.5"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link to="/login">
            <motion.button
              className="px-4 py-2 text-sm text-slate-300 border border-white/20 rounded-lg hover:border-white/40 hover:text-white transition-all"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              Sign in
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
            >
              Get started
            </motion.button>
          </Link>
        </motion.div>
      </motion.nav>

      {/* ── Hero ── */}
      <section className="px-6 pt-24 pb-16 text-center bg-[#080b14]">
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
          Kanban-based task management
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 leading-tight max-w-3xl mx-auto mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Manage your tasks <span className="text-blue-400">like a pro</span>
        </motion.h1>

        <motion.p
          className="text-lg text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          TaskFlow helps you organize work visually with boards, lists, and cards — keeping your team in sync and projects on track.
        </motion.p>

        <motion.div
          className="flex gap-3 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link to="/register">
            <motion.button
              className="px-8 py-3.5 text-base font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Start for free
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              className="px-8 py-3.5 text-base text-slate-300 border border-white/20 rounded-xl hover:border-white/40 hover:text-white transition-all"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Sign in
            </motion.button>
          </Link>
        </motion.div>

        {/* Kanban Preview */}
        <motion.div
          className="mt-14 mx-auto max-w-2xl bg-[#0f1523] rounded-2xl border border-white/[0.08] p-5"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex gap-2 mb-4">
            {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
              <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {kbCols.map((col, ci) => (
              <motion.div
                key={col.title}
                className="bg-[#161d2f] rounded-xl p-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.8 + ci * 0.1 }}
              >
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-3">{col.title}</div>
                {col.cards.map((c, i) => (
                  <motion.div
                    key={c.t}
                    className="bg-[#1e2a42] rounded-lg p-2.5 mb-2 border border-white/[0.06]"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.95 + ci * 0.1 + i * 0.07 }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    <div className="text-[13px] text-slate-300 mb-1.5">{c.t}</div>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${c.cls}`}>{c.tag}</span>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-20 bg-[#080b14]">
        <FadeInSection className="text-center mb-12">
          <div className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Features</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Everything you need to stay organized</h2>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">Simple, powerful tools to manage any project from start to finish.</p>
        </FadeInSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map(f => (
            <motion.div
              key={f.title}
              className="bg-[#0f1523] rounded-2xl border border-white/[0.07] p-6 transition-all cursor-default"
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.3)' }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.12, rotate: 6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                {f.icon}
              </motion.div>
              <h3 className="text-base font-medium text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </StaggerGrid>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-20 bg-[#060910]">
        <FadeInSection className="text-center mb-12">
          <div className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">How it works</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Up and running in minutes</h2>
          <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">No setup headaches. Just sign up and start organizing.</p>
        </FadeInSection>

        <StaggerGrid className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={s.n} className="flex sm:contents items-center gap-4 flex-1">
              <motion.div
                className="text-center px-4 py-2 flex-1"
                variants={cardVariants}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-lg font-medium text-blue-400 mx-auto mb-4"
                  whileHover={{ scale: 1.15, backgroundColor: 'rgba(59,130,246,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                >
                  {s.n}
                </motion.div>
                <h3 className="text-sm font-medium text-slate-100 mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className="text-slate-700 hidden sm:flex items-center"
                  variants={cardVariants}
                >
                  <ArrowRight size={20} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </StaggerGrid>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 text-center bg-[#080b14] border-t border-white/[0.06]">
        <FadeInSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">Ready to get started? </h2>
          <p className="text-slate-400 text-base mb-8">Join thousands of teams already using TaskFlow.</p>
          <Link to="/register">
            <motion.button
              className="px-10 py-4 text-lg font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Create free account
            </motion.button>
          </Link>
        </FadeInSection>
      </section>

      {/* ── Footer ── */}
      <motion.footer
        className="px-8 py-6 bg-[#060910] border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-500 flex  items-center gap-1"><Copyright size={15}/> 2026 TaskFlow. All rights reserved.</span>
        </div>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <motion.a
              key={l} href="#"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              whileHover={{ y: -1 }}
            >
              {l}
            </motion.a>
          ))}
        </div>
      </motion.footer>

    </div>
  );
}