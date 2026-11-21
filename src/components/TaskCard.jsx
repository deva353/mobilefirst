import { Calendar, Pencil, Trash2, Tag } from 'lucide-react';

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];

function getStatusClass(status) {
  switch (status) {
    case 'Completed':
      return 'badge--status-completed';
    case 'In progress':
      return 'badge--status-progress';
    default:
      return 'badge--status-todo';
  }
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'High':
      return 'badge--priority-high';
    case 'Medium':
      return 'badge--priority-medium';
    default:
      return 'badge--priority-low';
  }
}

function formatDueDate(dateStr) {
  if (!dateStr) return 'No due date';
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
}

function isTaskOverdue(dateStr, status) {
  if (!dateStr || status === 'Completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = dateStr.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  return due < today;
}

export default function TaskCard({
  task,
  onEdit,
  onDeleteRequest,
  onStatusChange,
}) {
  const overdue = isTaskOverdue(task.dueDate, task.status);
  const isCompleted = task.status === 'Completed';

  return (
    <article
      className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}
    >
      <div className="task-card__main">
        <div className="task-card__top-row">
          <div className="task-card__badges">
            <span className={`badge ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
            <span className={`badge ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            {task.category && (
              <span className="badge badge--category">
                <Tag size={12} aria-hidden="true" />
                {task.category}
              </span>
            )}
          </div>

          <span
            className={`task-card__due ${
              overdue ? 'task-card__due--overdue' : ''
            }`}
          >
            <Calendar size={14} aria-hidden="true" />
            <span>
              {formatDueDate(task.dueDate)}
              {overdue ? ' (Overdue)' : ''}
            </span>
          </span>
        </div>

        <h3 className="task-card__title">{task.title}</h3>

        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}
      </div>

      <div className="task-card__actions">
        <label className="task-card__status-control">
          <span className="sr-only">Change status for {task.title}</span>
          <select
            className="task-card__status-select"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            aria-label={`Status for ${task.title}`}
          >
            {STATUS_OPTIONS.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </label>

        <div className="task-card__btn-group">
          <button
            type="button"
            className="icon-btn"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDeleteRequest(task)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}