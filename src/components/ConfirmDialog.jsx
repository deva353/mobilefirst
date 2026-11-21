import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  taskTitle,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div
        className="modal-card modal-card--confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-card__header">
          <div className="confirm-dialog__title-row">
            <div className="confirm-dialog__icon" aria-hidden="true">
              <AlertTriangle size={20} />
            </div>
            <h2 id="confirm-dialog-title" className="modal-card__title">
              Delete Task?
            </h2>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={onCancel}
            aria-label="Close confirmation dialog"
          >
            <X size={20} />
          </button>
        </div>

        <p id="confirm-dialog-desc" className="confirm-dialog__text">
          Are you sure you want to permanently remove{' '}
          <strong>“{taskTitle}”</strong>? This action cannot be undone.
        </p>

        <div className="modal-card__footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={onConfirm}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}