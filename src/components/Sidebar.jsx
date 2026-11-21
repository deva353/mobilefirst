import {
  LayoutDashboard,
  CircleDot,
  Clock,
  CheckCircle2,
  RotateCcw,
  X,
  Layers,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'All', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'To do', label: 'To Do', icon: CircleDot },
  { id: 'In progress', label: 'In Progress', icon: Clock },
  { id: 'Completed', label: 'Completed', icon: CheckCircle2 },
];

export default function Sidebar({
  activeStatus,
  onSelectStatus,
  isOpen,
  onClose,
  counts,
  onResetDemoData,
}) {
  const handleNavClick = (statusId) => {
    onSelectStatus(statusId);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Primary Navigation"
      >
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__logo" aria-hidden="true">
              <Layers size={20} />
            </div>
            <div>
              <span className="sidebar__title">FocusBoard</span>
              <span className="sidebar__subtitle">Task Workspace</span>
            </div>
          </div>

          <button
            type="button"
            className="icon-btn sidebar__close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          <p className="sidebar__section-label">WORKSPACE</p>
          <ul className="sidebar__list">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = activeStatus === id;
              const badgeCount =
                id === 'All' ? counts.total : counts[id] ?? 0;

              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`sidebar__link ${
                      isActive ? 'sidebar__link--active' : ''
                    }`}
                    onClick={() => handleNavClick(id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="sidebar__link-left">
                      <Icon size={18} aria-hidden="true" />
                      <span>{label}</span>
                    </span>
                    <span className="sidebar__badge">{badgeCount}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <button
            type="button"
            className="btn btn--ghost sidebar__reset-btn"
            onClick={onResetDemoData}
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>Restore Sample Tasks</span>
          </button>
        </div>
      </aside>
    </>
  );
}