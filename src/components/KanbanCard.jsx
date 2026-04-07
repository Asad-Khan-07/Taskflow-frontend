import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, CheckSquare, Flag } from 'lucide-react';
import CardModal from './CardModal';

const PRIORITY_DOT = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-orange-400',
  urgent: 'bg-rose-400',
};

export default function KanbanCard({ card, listTitle }) {
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { type: 'card', card } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const completedChecks = card.checklist?.filter(c => c.completed).length || 0;
  const totalChecks = card.checklist?.length || 0;
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => setShowModal(true)}
        className="card-item group animate-fade-in"
      >
        {/* Labels */}
        {card.labels?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.labels.map((label, i) => (
              <span key={i} className="text-xs font-body px-2 py-0.5 rounded-full font-medium text-white"
                style={{ backgroundColor: label.color + '40', border: `1px solid ${label.color}60` }}>
                {label.text}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <p className="text-slate-200 text-sm font-body leading-snug font-medium">{card.title}</p>

        {/* Meta row */}
        <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
          {/* Priority */}
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_DOT[card.priority || 'medium']}`} title={card.priority} />

          {/* Due date */}
          {card.dueDate && (
            <span className={`flex items-center gap-1 text-xs font-body ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
              <Calendar size={10} />
              {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}

          {/* Checklist */}
          {totalChecks > 0 && (
            <span className={`flex items-center gap-1 text-xs font-body ml-auto ${completedChecks === totalChecks ? 'text-emerald-400' : 'text-slate-500'}`}>
              <CheckSquare size={10} />
              {completedChecks}/{totalChecks}
            </span>
          )}
        </div>
      </div>

      {showModal && (
        <CardModal card={card} listTitle={listTitle} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
