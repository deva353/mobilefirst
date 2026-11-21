export const INITIAL_TASKS = [
  {
    id: 101,
    title: 'Finalize FocusBoard responsive grid layout',
    description:
      'Verify desktop (1440px), tablet (768px), and mobile (390px) breakpoints against Figma spacing tokens.',
    category: 'Design',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-20',
  },
  {
    id: 102,
    title: 'Implement localStorage state persistence hook',
    description:
      'Build reusable useLocalStorage hook with JSON fallback handling so tasks survive page reloads.',
    category: 'Development',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-21',
  },
  {
    id: 103,
    title: 'Build multi-criteria task search and filter bar',
    description:
      'Combine case-insensitive title search with status tabs and priority dropdown filtering.',
    category: 'Development',
    status: 'In progress',
    priority: 'High',
    dueDate: '2026-11-23',
  },
  {
    id: 104,
    title: 'Audit keyboard navigation and ARIA labels',
    description:
      'Test modal focus trapping, Escape key handling, and screen-reader announcements across controls.',
    category: 'Testing',
    status: 'In progress',
    priority: 'Medium',
    dueDate: '2026-11-24',
  },
  {
    id: 105,
    title: 'Benchmark empty-state and edge-case task flows',
    description:
      'Validate zero-task completion percentage math, whitespace-only title rejection, and delete confirmation.',
    category: 'Testing',
    status: 'To do',
    priority: 'Medium',
    dueDate: '2026-11-25',
  },
  {
    id: 106,
    title: 'Research micro-interaction patterns for Focus Notes',
    description:
      'Evaluate circular slide transitions and dot indicator affordances for quick daily review.',
    category: 'Research',
    status: 'To do',
    priority: 'Low',
    dueDate: '2026-11-27',
  },
  {
    id: 107,
    title: 'Prepare production build and deployment checklist',
    description:
      'Run Vite production bundle check and verify zero console warnings before deploying to Vercel.',
    category: 'Development',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-11-22',
  },
];