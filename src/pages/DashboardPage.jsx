import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutDashboard, Trash2, X, Hand } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import useBoardStore from '../store/boardStore';
import useAuthStore from '../store/authStore';

const BOARD_BACKGROUNDS = [
  '#0f172a', '#1e1b4b', '#14532d', '#7f1d1d',
  '#164e63', '#1c1917', '#4a1d96', '#134e4a',
];

const BG_LABELS = [
  'Midnight', 'Indigo', 'Forest', 'Crimson',
  'Ocean', 'Obsidian', 'Grape', 'Teal',
];

export default function DashboardPage() {
  const { boards, fetchBoards, createBoard, deleteBoard, loading } = useBoardStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', background: '#0f172a' });
  const [creating, setCreating] = useState(false);

  useEffect(() => { fetchBoards(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Board title required');
    setCreating(true);
    try {
      const board = await createBoard(form);
      toast.success('Board created!');
      setShowModal(false);
      setForm({ title: '', description: '', background: '#0f172a' });
      navigate(`/board/${board._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create board');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Delete this board? This cannot be undone.')) return;
    try {
      await deleteBoard(id);
      toast.success('Board deleted');
    } catch {
      toast.error('Failed to delete board');
    }
  };

  return (
    <div className="min-h-screen bg-surface-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white flex items-center gap-2">
              Hey, {user?.name?.split(' ')[0]}
              <Hand size={30} className="text-amber-400" />
            </h1>
            <p className="text-slate-400 mt-1 font-body">Manage your boards and projects</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            <span className="hidden sm:inline">New Board</span>
          </button>
        </div>

        {/* Boards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 glass rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : boards.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={28} className="text-slate-500" />
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-300 mb-2">No boards yet</h3>
            <p className="text-slate-500 font-body mb-6">Create your first board to get started</p>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              <Plus size={16} className="inline mr-2" />Create Board
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {boards.map(board => (
              <div
                key={board._id}
                onClick={() => navigate(`/board/${board._id}`)}
                className="group relative h-36 rounded-2xl cursor-pointer overflow-hidden border border-white/10 hover:border-white/25 hover:scale-[1.02] transition-all duration-200 animate-fade-in"
                style={{ backgroundColor: board.background }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="font-display font-bold text-white text-lg leading-tight">{board.title}</h3>
                  {board.description && (
                    <p className="text-slate-300 text-xs mt-1 font-body line-clamp-1">{board.description}</p>
                  )}
                </div>
                <button
                  onClick={(e) => handleDelete(e, board._id)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-black/40 text-slate-400 hover:text-accent-rose hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}

            {/* Add new card */}
            <button
              onClick={() => setShowModal(true)}
              className="h-36 rounded-2xl border-2 border-dashed border-white/15 hover:border-primary-500/50 hover:bg-primary-500/5 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-primary-400 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={20} />
              </div>
              <span className="text-sm font-body">New board</span>
            </button>
          </div>
        )}
      </main>

      {/* Create Board Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass rounded-2xl w-full max-w-md shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-xl font-bold text-white">Create Board</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Title *</label>
                <input className="input-field" placeholder="My awesome project"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
                <textarea className="input-field resize-none" rows={2} placeholder="What's this board about?"
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Background</label>
                <div className="grid grid-cols-4 gap-2">
                  {BOARD_BACKGROUNDS.map((bg, i) => (
                    <button key={bg} type="button"
                      onClick={() => setForm({ ...form, background: bg })}
                      className={`h-10 rounded-lg transition-all ${form.background === bg ? 'ring-2 ring-primary-400 scale-95' : 'hover:scale-95 opacity-80 hover:opacity-100'}`}
                      style={{ backgroundColor: bg }}
                      title={BG_LABELS[i]}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary flex-1">
                  {creating ? 'Creating...' : 'Create Board'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}