import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { Plus, ArrowLeft, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import KanbanList from '../components/KanbanList';
import KanbanCard from '../components/KanbanCard';
import useBoardStore from '../store/boardStore';
import { cardsAPI } from '../services/api';

export default function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBoard, lists, cards, fetchBoard, createList, setLists, setCards, loading } = useBoardStore();
  const [addingList, setAddingList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => { fetchBoard(id); }, [id]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const getCardsByList = (listId) =>
    cards.filter(c => c.list === listId).sort((a, b) => a.position - b.position);

  const handleDragStart = ({ active }) => {
    const card = cards.find(c => c._id === active.id);
    if (card) setActiveCard(card);
  };

  const handleDragOver = useCallback(({ active, over }) => {
    if (!over) return;
    const activeCard = cards.find(c => c._id === active.id);
    if (!activeCard) return;

    const overId = over.id;
    const overList = lists.find(l => l._id === overId);
    const overCard = cards.find(c => c._id === overId);
    const targetListId = overList ? overList._id : overCard?.list;

    if (!targetListId || activeCard.list === targetListId) return;
    setCards(cards.map(c => c._id === activeCard._id ? { ...c, list: targetListId } : c));
  }, [cards, lists]);

  const handleDragEnd = useCallback(async ({ active, over }) => {
    setActiveCard(null);
    if (!over) return;

    const activeCard = cards.find(c => c._id === active.id);
    if (!activeCard) return;

    const overId = over.id;
    const overList = lists.find(l => l._id === overId);
    const overCard = cards.find(c => c._id === overId);
    const targetListId = overList ? overList._id : overCard?.list;
    if (!targetListId) return;

    const targetListCards = cards.filter(c => c.list === targetListId && c._id !== activeCard._id).sort((a, b) => a.position - b.position);
    let newPosition = targetListCards.length;

    if (overCard && overCard._id !== activeCard._id) {
      const overIdx = targetListCards.findIndex(c => c._id === overCard._id);
      newPosition = overIdx >= 0 ? overIdx : targetListCards.length;
    }

    const updatedCards = cards.map(c =>
      c._id === activeCard._id ? { ...c, list: targetListId, position: newPosition } : c
    );
    setCards(updatedCards);

    try {
      await cardsAPI.move(activeCard._id, { listId: targetListId, position: newPosition });
    } catch {
      toast.error('Failed to save card position');
      fetchBoard(id);
    }
  }, [cards, lists, id]);

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!listTitle.trim()) return;
    try {
      await createList(listTitle.trim(), id);
      setListTitle('');
      setAddingList(false);
      toast.success('List created');
    } catch {
      toast.error('Failed to create list');
    }
  };

  if (loading && !currentBoard) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 font-body">Loading board...</p>
        </div>
      </div>
    );
  }

  const sortedLists = [...lists].sort((a, b) => a.position - b.position);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: currentBoard?.background || '#0a0f1e' }}>
      {/* Dark overlay on board background */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <Navbar boardTitle={currentBoard?.title} />

        {/* Board toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <button onClick={() => navigate('/')} className="btn-ghost flex items-center gap-1.5 text-sm py-1.5 px-3">
            <ArrowLeft size={15} /> Boards
          </button>
          <span className="w-px h-5 bg-white/10" />
          <h2 className="font-display font-bold text-white text-lg">{currentBoard?.title}</h2>
        </div>

        {/* Kanban board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
            <div className="flex gap-4 h-full items-start pb-4" style={{ minWidth: 'max-content' }}>
              {sortedLists.map(list => (
                <KanbanList
                  key={list._id}
                  list={list}
                  cards={getCardsByList(list._id)}
                />
              ))}

              {/* Add List */}
              <div className="flex-shrink-0 w-72">
                {addingList ? (
                  <div className="glass rounded-2xl p-3 animate-fade-in">
                    <form onSubmit={handleAddList} className="space-y-2">
                      <input
                        className="input-field text-sm py-2"
                        placeholder="List title..."
                        value={listTitle}
                        onChange={e => setListTitle(e.target.value)}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="btn-primary text-xs py-1.5 px-3">Add List</button>
                        <button type="button" onClick={() => { setAddingList(false); setListTitle(''); }} className="btn-ghost text-xs py-1.5 px-3">
                          <X size={13} />
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingList(true)}
                    className="w-full glass rounded-2xl p-3.5 flex items-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all text-sm font-body border border-dashed border-white/15 hover:border-white/30"
                  >
                    <Plus size={16} /> Add list
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Drag overlay */}
          <DragOverlay>
            {activeCard ? (
              <div className="rotate-2 shadow-2xl opacity-95">
                <KanbanCard card={activeCard} listTitle="" />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
