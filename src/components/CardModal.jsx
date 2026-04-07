import { useState, useEffect } from 'react';
import { X, Calendar, Flag, Tag, Trash2, CheckSquare, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import useBoardStore from '../store/boardStore';

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'text-emerald-400 bg-emerald-400/15 border-emerald-400/30' },
  medium: { label: 'Medium', color: 'text-amber-400 bg-amber-400/15 border-amber-400/30' },
  high: { label: 'High', color: 'text-orange-400 bg-orange-400/15 border-orange-400/30' },
  urgent: { label: 'Urgent', color: 'text-rose-400 bg-rose-400/15 border-rose-400/30' },
};

const LABEL_COLORS = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#06b6d4'];

export default function CardModal({ card, listTitle, onClose }) {
  const { updateCard, deleteCard } = useBoardStore();
  const [form, setForm] = useState({
    title: card.title,
    description: card.description || '',
    priority: card.priority || 'medium',
    dueDate: card.dueDate ? card.dueDate.split('T')[0] : '',
    checklist: card.checklist || [],
    labels: card.labels || [],
  });
  const [saving, setSaving] = useState(false);
  const [newCheck, setNewCheck] = useState('');
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const [labelText, setLabelText] = useState('');
  const [labelColor, setLabelColor] = useState(LABEL_COLORS[0]);

  const save = async () => {
    setSaving(true);
    try {
      await updateCard(card._id, form);
      toast.success('Card updated');
      onClose();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this card?')) return;
    try {
      await deleteCard(card._id);
      toast.success('Card deleted');
      onClose();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const addCheckItem = () => {
    if (!newCheck.trim()) return;
    setForm(f => ({ ...f, checklist: [...f.checklist, { text: newCheck.trim(), completed: false }] }));
    setNewCheck('');
  };

  const toggleCheck = (idx) => {
    setForm(f => ({
      ...f,
      checklist: f.checklist.map((item, i) => i === idx ? { ...item, completed: !item.completed } : item)
    }));
  };

  const removeCheck = (idx) => {
    setForm(f => ({ ...f, checklist: f.checklist.filter((_, i) => i !== idx) }));
  };

  const addLabel = () => {
    if (!labelText.trim()) return;
    setForm(f => ({ ...f, labels: [...f.labels, { color: labelColor, text: labelText.trim() }] }));
    setLabelText('');
    setShowLabelPicker(false);
  };

  const removeLabel = (idx) => {
    setForm(f => ({ ...f, labels: f.labels.filter((_, i) => i !== idx) }));
  };

  const completedCount = form.checklist.filter(c => c.completed).length;
  const progress = form.checklist.length ? (completedCount / form.checklist.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto animate-fade-in" onClick={onClose}>
      <div className="glass rounded-2xl w-full max-w-2xl my-8 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div className="flex-1 mr-4">
            <p className="text-xs text-slate-500 font-body mb-1">in {listTitle}</p>
            <input
              className="bg-transparent text-xl font-display font-bold text-white w-full focus:outline-none focus:border-b focus:border-primary-500"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Labels */}
          {form.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.labels.map((label, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-full font-medium text-white"
                  style={{ backgroundColor: label.color + '33', border: `1px solid ${label.color}55` }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: label.color }} />
                  {label.text}
                  <button onClick={() => removeLabel(i)} className="text-white/60 hover:text-white ml-0.5"><X size={10} /></button>
                </span>
              ))}
            </div>
          )}

          {/* Priority & Due Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2"><Flag size={12} /> Priority</label>
              <select
                className="input-field text-sm py-2"
                value={form.priority}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                {Object.entries(PRIORITY_CONFIG).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-2"><Calendar size={12} /> Due Date</label>
              <input type="date" className="input-field text-sm py-2"
                value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Description</label>
            <textarea
              className="input-field resize-none text-sm"
              rows={4}
              placeholder="Add a description..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <CheckSquare size={12} /> Checklist
                {form.checklist.length > 0 && (
                  <span className="text-slate-500">({completedCount}/{form.checklist.length})</span>
                )}
              </label>
            </div>
            {form.checklist.length > 0 && (
              <div className="mb-3">
                <div className="h-1 bg-surface-600 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="space-y-1.5">
                  {form.checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <input type="checkbox" checked={item.completed} onChange={() => toggleCheck(i)}
                        className="w-4 h-4 rounded accent-primary-500" />
                      <span className={`text-sm font-body flex-1 ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {item.text}
                      </span>
                      <button onClick={() => removeCheck(i)} className="text-slate-600 hover:text-accent-rose opacity-0 group-hover:opacity-100 transition-all">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <input className="input-field text-sm flex-1 py-2" placeholder="Add item..."
                value={newCheck} onChange={e => setNewCheck(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCheckItem()} />
              <button onClick={addCheckItem} className="btn-ghost px-3 py-2 text-sm">Add</button>
            </div>
          </div>

          {/* Labels picker */}
          <div>
            <button onClick={() => setShowLabelPicker(!showLabelPicker)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors">
              <Tag size={12} /> Add Label
            </button>
            {showLabelPicker && (
              <div className="mt-2 glass-dark rounded-xl p-3 space-y-2 animate-fade-in">
                <div className="flex gap-2">
                  {LABEL_COLORS.map(c => (
                    <button key={c} onClick={() => setLabelColor(c)}
                      className={`w-6 h-6 rounded-md transition-all ${labelColor === c ? 'ring-2 ring-white scale-110' : ''}`}
                      style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className="input-field text-sm py-1.5 flex-1" placeholder="Label text..."
                    value={labelText} onChange={e => setLabelText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addLabel()} />
                  <button onClick={addLabel} className="btn-primary px-3 py-1.5 text-sm">Add</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <button onClick={handleDelete} className="btn-danger flex items-center gap-2 text-sm">
            <Trash2 size={14} /> Delete Card
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn-ghost text-sm">Cancel</button>
            <button onClick={save} disabled={saving} className="btn-primary text-sm">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
