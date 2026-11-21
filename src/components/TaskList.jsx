import { ClipboardList, Plus, RotateCcw } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  totalTaskCount,
  onEdit,
  onDeleteRequest,
  onStatusChange,
  onResetFilters,
  onOpenCreateModal,
}) {
  if (totalTaskCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <ClipboardList size={28} />
        </div>
        <h3 className="empty-state__title">No tasks in FocusBoard yet</h3>
        <p className="empty-state__text">
          Create your first task to start tracking progress and completion metrics.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onOpenCreateModal}
        >
          <Plus size={17} aria-hidden="true" />
          <span>Create First Task</span>
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon" aria-hidden="true">
          <ClipboardList size={28} />
        </div>
        <h3 className="empty-state__title">No matching tasks found</h3>
        <p className="empty-state__text">
          No tasks match your current search term, status tab, or priority filter.
        </p>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onResetFilters}
        >
          <RotateCcw size={16} aria-hidden="true" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}