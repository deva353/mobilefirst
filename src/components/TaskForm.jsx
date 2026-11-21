import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = ['To do', 'In progress', 'Completed'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];
const CATEGORY_OPTIONS = ['Development', 'Design', 'Testing', 'Research'];

function getDefaultDueDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export default function TaskForm({ isOpen, onClose, onSubmit, editingTask }) {
  const isEditMode = Boolean(editingTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setCategory(editingTask.category || 'Development');
      setStatus(editingTask.status || 'To do');
      setPriority(editingTask.priority || 'Medium');
      setDueDate(editingTask.dueDate || getDefaultDueDate());
    } else {
      setTitle('');
      setDescription('');
      setCategory('Development');
      setStatus('To do');
      setPriority('Medium');
      setDueDate(getDefaultDueDate());
    }
    setErrors({});
  }, [isOpen, editingTask]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const nextErrors = {};
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      nextErrors.title = 'Task title is required and cannot be blank.';
    } else if (trimmedTitle.length < 3) {
      nextErrors.title = 'Task title must be at least 3 characters.';
    }

    if (!STATUS_OPTIONS.includes(status)) {
      nextErrors.status = 'Please select a valid status.';
    }

    if (!PRIORITY_OPTIONS.includes(priority)) {
      nextErrors.priority = 'Please select a valid priority.';
    }

    if (!dueDate) {
      nextErrors.dueDate = 'Please select a due date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate,
    };

    onSubmit(payload);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div
        className="modal-card modal-card--form"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-card__header">
          <div>
            <h2 id="task-form-title" className="modal-card__title">
              {isEditMode ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="modal-card__subtitle">
              {isEditMode
                ? 'Update task details, priority, or current execution status.'
                : 'Fill in the fields below to add a task to FocusBoard.'}
            </p>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Task Title <span className="form-required">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g., Implement API error boundary"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              autoFocus
              required
            />
            {errors.title && (
              <p className="form-error" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description <span className="form-optional">(Optional)</span>
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              rows={4}
              placeholder="Add acceptance criteria, context, or implementation notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Status <span className="form-required">*</span>
              </label>
              <select
                id="task-status"
                className={`form-select ${
                  errors.status ? 'form-input--error' : ''
                }`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="form-error" role="alert">
                  {errors.status}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority <span className="form-required">*</span>
              </label>
              <select
                id="task-priority"
                className={`form-select ${
                  errors.priority ? 'form-input--error' : ''
                }`}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="form-error" role="alert">
                  {errors.priority}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">
                Due Date <span className="form-required">*</span>
              </label>
              <input
                id="task-due-date"
                type="date"
                className={`form-input ${
                  errors.dueDate ? 'form-input--error' : ''
                }`}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  if (errors.dueDate) {
                    setErrors((prev) => ({ ...prev, dueDate: '' }));
                  }
                }}
                required
              />
              {errors.dueDate && (
                <p className="form-error" role="alert">
                  {errors.dueDate}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-card__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}