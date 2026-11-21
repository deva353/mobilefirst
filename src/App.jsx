import { useState, useMemo } from 'react';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { INITIAL_TASKS } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';

export default function App() {
  const [tasks, setTasks] = useLocalStorage(
    'focusboard_tasks_v1',
    INITIAL_TASKS
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Dynamic statistics calculated directly from task state
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const completionPercentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      'To do': todo,
      'In progress': inProgress,
      Completed: completed,
      completionPercentage,
    };
  }, [tasks]);

  // Combined search, status, and priority filtering
  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesTitle =
        normalizedQuery === '' ||
        task.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesTitle && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...formData, id: editingTask.id }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
      };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    }
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task
      )
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id)
    );
    setTaskToDelete(null);
  };

  const handleResetDemoData = () => {
    setTasks(INITIAL_TASKS);
    handleResetFilters();
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeStatus={statusFilter}
        onSelectStatus={setStatusFilter}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        counts={stats}
        onResetDemoData={handleResetDemoData}
      />

      <div className="app-main">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCreateModal={handleOpenCreateModal}
          activeStatus={statusFilter}
        />

        <main className="dashboard-content">
          {/* Overview Statistics */}
          <section
            className="stats-grid"
            aria-label="Task Overview Statistics"
          >
            <StatCard
              title="Total Tasks"
              value={stats.total}
              subtitle={`${stats['To do']} queued in To do`}
              icon={ListTodo}
              variant="total"
            />
            <StatCard
              title="In Progress"
              value={stats['In progress']}
              subtitle="Currently active tasks"
              icon={Clock}
              variant="progress"
            />
            <StatCard
              title="Completed"
              value={stats.Completed}
              subtitle="Verified and closed"
              icon={CheckCircle2}
              variant="completed"
            />
            <StatCard
              title="Completion Rate"
              value={`${stats.completionPercentage}%`}
              subtitle={`${stats.Completed} of ${stats.total} completed`}
              icon={TrendingUp}
              variant="rate"
            />
          </section>

          {/* 3-Slide Focus Notes Carousel */}
          <FocusNotes />

          {/* Task Controls & Task List */}
          <section className="tasks-section" aria-label="Task Management">
            <div className="tasks-section__toolbar">
              <div className="tasks-section__heading">
                <h2>Tasks</h2>
                <span className="tasks-section__count">
                  Showing {filteredTasks.length} of {tasks.length}
                </span>
              </div>

              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              counts={stats}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
            />

            <TaskList
              tasks={filteredTasks}
              totalTaskCount={tasks.length}
              onEdit={handleOpenEditModal}
              onDeleteRequest={setTaskToDelete}
              onStatusChange={handleStatusChange}
              onResetFilters={handleResetFilters}
              onOpenCreateModal={handleOpenCreateModal}
            />
          </section>
        </main>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSaveTask}
        editingTask={editingTask}
      />

      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        taskTitle={taskToDelete?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}