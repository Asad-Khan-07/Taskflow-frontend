import { useState, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreHorizontal, Trash2, Edit2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import KanbanCard from './KanbanCard';
import useBoardStore from '../store/boardStore';

export default function KanbanList({ list, cards }) {
  const { createCard, updateList, deleteList } = useBoardStore();
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const { setNodeRef, isOver } = useDroppable({ id: list._id, data: { type: 'list', listId: list._id } });

  const handleAddCard = async () => {
    if (!cardTitle.trim()) return;
    try {
      await createCard(cardTitle.trim(), list._id, list.board);
      setCardTitle('');
      setAddingCard(false);
      toast.success('Card added');
    } catch {
      toast.error('Failed to add card');
    }
  };

  const handleUpdateTitle = async () => {
    if (!newTitle.trim() || newTitle === list.title) {
      setEditingTitle(false);
      setNewTitle(list.title);
      return;
    }
    try {
      await updateList(list._id, { title: newTitle.trim() });
      setEditingTitle(false);
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete list "${list.title}" and all its cards?`)) return;
    try {
      await deleteList(list._id);
      toast.success('List deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="flex-shrink-0 w-72 flex flex-col max-h-full">
      <div className={`glass rounded-2xl flex flex-col max-h-full transition-all duration-200 ${isOver ? 'ring-2 ring-primary-500/50 bg-primary-500/5' : ''}`}>
        {/* List header */}
        <div className="flex items-center gap-2 p-3 pb-2">
          {editingTitle ? (
            <div className="flex items-center gap-1 flex-1">
              <input
                className="input-field py-1 text-sm flex-1"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleUpdateTitle(); if (e.key === 'Escape') { setEditingTitle(false); setNewTitle(list.title); } }}
                autoFocus
              />
              <button onClick={handleUpdateTitle} className="text-emerald-400 hover:text-emerald-300 p-1"><Check size={14} /></button>
              <button onClick={() => { setEditingTitle(false); setNewTitle(list.title); }} className="text-slate-400 hover:text-slate-300 p-1"><X size={14} /></button>
            </div>
          ) : (
            <h3
              className="font-display font-semibold text-slate-200 text-sm flex-1 cursor-pointer hover:text-white transition-colors"
              onClick={() => setEditingTitle(true)}
            >
              {list.title}
            </h3>
          )}
          <span className="text-xs text-slate-500 font-mono bg-surface-600 px-1.5 py-0.5 rounded-md">{cards.length}</span>

          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-white/10 transition-all">
              <MoreHorizontal size={15} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 glass rounded-xl overflow-hidden shadow-xl z-30 animate-fade-in">
                <button onClick={() => { setEditingTitle(true); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10 transition-colors font-body">
                  <Edit2 size={13} /> Rename
                </button>
                <button onClick={() => { handleDelete(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-accent-rose hover:bg-accent-rose/10 transition-colors font-body">
                  <Trash2 size={13} /> Delete List
                </button>
              </div>
            )}
            {menuOpen && <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />}
          </div>
        </div>

        {/* Cards area */}
        <div ref={setNodeRef} className="flex-1 overflow-y-auto px-3 pb-2 space-y-2 min-h-[2px]">
          <SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy}>
            {cards.map(card => (
              <KanbanCard key={card._id} card={card} listTitle={list.title} />
            ))}
          </SortableContext>
        </div>

        {/* Add card */}
        <div className="p-3 pt-1">
          {addingCard ? (
            <div className="space-y-2 animate-fade-in">
              <textarea
                className="input-field resize-none text-sm py-2"
                rows={2}
                placeholder="Card title..."
                value={cardTitle}
                onChange={e => setCardTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddCard(); } if (e.key === 'Escape') setAddingCard(false); }}
                autoFocus
              />
              <div className="flex gap-2">
                <button onClick={handleAddCard} className="btn-primary text-xs py-1.5 px-3">Add Card</button>
                <button onClick={() => { setAddingCard(false); setCardTitle(''); }} className="btn-ghost text-xs py-1.5 px-3">
                  <X size={13} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingCard(true)}
              className="w-full flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-body py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <Plus size={15} /> Add card
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
