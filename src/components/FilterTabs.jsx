import { Filter, RotateCcw } from 'lucide-react';

const STATUS_TABS = ['All', 'To do', 'In progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts,
  hasActiveFilters,
  onResetFilters,
}) {
  return (
    <div className="filter-bar">
      <div
        className="filter-tabs"
        role="tablist"
        aria-label="Filter tasks by status"
      >
        {STATUS_TABS.map((tab) => {
          const isActive = statusFilter === tab;
          const count = tab === 'All' ? counts.total : counts[tab] ?? 0;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-tab ${isActive ? 'filter-tab--active' : ''}`}
              onClick={() => onStatusChange(tab)}
            >
              <span>{tab}</span>
              <span className="filter-tab__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-bar__right">
        <label className="priority-filter">
          <Filter size={15} aria-hidden="true" />
          <span className="sr-only">Filter by priority</span>
          <select
            className="priority-filter__select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter by priority"
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority === 'All' ? 'Priority: All' : `Priority: ${priority}`}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={onResetFilters}
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}