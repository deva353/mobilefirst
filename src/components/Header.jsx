import { Menu, Plus, Calendar } from 'lucide-react';

export default function Header({ onOpenSidebar, onOpenCreateModal, activeStatus }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const headingText =
    activeStatus === 'All' ? 'My Tasks Overview' : `${activeStatus} Tasks`;

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="icon-btn header__menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="header__title">{headingText}</h1>
          <p className="header__subtitle">
            Track execution, filter priorities, and maintain daily focus.
          </p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__date" aria-label="Current date">
          <Calendar size={16} aria-hidden="true" />
          <span>{formattedDate}</span>
        </div>

        <button
          type="button"
          className="btn btn--primary"
          onClick={onOpenCreateModal}
        >
          <Plus size={18} aria-hidden="true" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}