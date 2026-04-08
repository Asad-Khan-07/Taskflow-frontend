import { Link } from 'react-router-dom';
import { Zap, LayoutDashboard, CheckSquare, RefreshCw, Layers, Shield, Activity } from 'lucide-react';

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

      {/* Navbar */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-white/[0.08] bg-[#080b14]/95 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">TaskFlow</span>
        </div>
        <div className="flex gap-2.5">
          <Link to="/login">
            <button className="px-4 py-2 text-sm text-slate-300 border border-white/20 rounded-lg hover:border-white/40 hover:text-white transition-all">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 text-center bg-[#080b14]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
          Kanban-based task management
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 leading-tight max-w-3xl mx-auto mb-5">
          Manage your tasks <span className="text-blue-400">like a pro</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
          TaskFlow helps you organize work visually with boards, lists, and cards — keeping your team in sync and projects on track.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/register">
            <button className="px-8 py-3.5 text-base font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all">
              Start for free
            </button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-3.5 text-base text-slate-300 border border-white/20 rounded-xl hover:border-white/40 hover:text-white transition-all">
              Sign in
            </button>
          </Link>
        </div>

        {/* Kanban Preview */}
        <div className="mt-14 mx-auto max-w-2xl bg-[#0f1523] rounded-2xl border border-white/[0.08] p-5">
          <div className="flex gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {kbCols.map(col => (
              <div key={col.title} className="bg-[#161d2f] rounded-xl p-3">
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mb-3">{col.title}</div>
                {col.cards.map(c => (
                  <div key={c.t} className="bg-[#1e2a42] rounded-lg p-2.5 mb-2 border border-white/[0.06]">
                    <div className="text-[13px] text-slate-300 mb-1.5">{c.t}</div>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${c.cls}`}>{c.tag}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#080b14]">
        <div className="text-center mb-12">
          <div className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">Features</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Everything you need to stay organized</h2>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">Simple, powerful tools to manage any project from start to finish.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map(f => (
            <div key={f.title} className="bg-[#0f1523] rounded-2xl border border-white/[0.07] p-6 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all">
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>{f.icon}</div>
              <h3 className="text-base font-medium text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-[#060910]">
        <div className="text-center mb-12">
          <div className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">How it works</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Up and running in minutes</h2>
          <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">No setup headaches. Just sign up and start organizing.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <>
              <div key={s.n} className="text-center px-4 py-2 flex-1">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-lg font-medium text-blue-400 mx-auto mb-4">{s.n}</div>
                <h3 className="text-sm font-medium text-slate-100 mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} className="text-slate-700 text-2xl hidden sm:block">→</div>
              )}
            </>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center bg-[#080b14] border-t border-white/[0.06]">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">Ready to get started?</h2>
        <p className="text-slate-400 text-base mb-8">Join thousands of teams already using TaskFlow.</p>
        <Link to="/register">
          <button className="px-10 py-4 text-lg font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all">
            Create free account
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-[#060910] border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Zap size={14} className="text-white" />
          </div>
          <span className="text-sm text-slate-500">© 2026 TaskFlow. All rights reserved.</span>
        </div>
        <div className="flex gap-5">
          {['Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{l}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}