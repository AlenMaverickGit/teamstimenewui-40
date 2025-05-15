
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeId: string;
  estimatedTime: number; // in seconds
  timeSpent: number; // in seconds
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate: string;
  teamIds: string[];
}

// Sample Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Developer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff',
  },
  {
    id: 'user2',
    name: 'Sam Taylor',
    email: 'sam@example.com',
    role: 'Designer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Sam+Taylor&background=2563EB&color=fff',
  },
  {
    id: 'user3',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    role: 'Project Manager',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jamie+Smith&background=4F46E5&color=fff',
  },
  {
    id: 'user4',
    name: 'Morgan Lee',
    email: 'morgan@example.com',
    role: 'Developer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Morgan+Lee&background=7C3AED&color=fff',
  },
  // Additional users
  {
    id: 'user5',
    name: 'Riley Chen',
    email: 'riley@example.com',
    role: 'Developer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Riley+Chen&background=EC4899&color=fff',
  },
  {
    id: 'user6',
    name: 'Jordan Patel',
    email: 'jordan@example.com',
    role: 'Designer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jordan+Patel&background=F59E0B&color=fff',
  },
  {
    id: 'user7',
    name: 'Casey Wilson',
    email: 'casey@example.com',
    role: 'QA Engineer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Casey+Wilson&background=10B981&color=fff',
  },
  {
    id: 'user8',
    name: 'Taylor Ahmed',
    email: 'taylor@example.com',
    role: 'Backend Developer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Taylor+Ahmed&background=8B5CF6&color=fff',
  },
  {
    id: 'user9',
    name: 'Robin Garcia',
    email: 'robin@example.com',
    role: 'DevOps Engineer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Robin+Garcia&background=EF4444&color=fff',
  },
  {
    id: 'user10',
    name: 'Quinn Murphy',
    email: 'quinn@example.com',
    role: 'Product Owner',
    avatarUrl: 'https://ui-avatars.com/api/?name=Quinn+Murphy&background=3B82F6&color=fff',
  },
];

// Sample Projects
export const projects: Project[] = [
  {
    id: 'project1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with new branding',
    clientName: 'Acme Corp',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    teamIds: ['user1', 'user2', 'user3', 'user5', 'user6', 'user9'],
  },
  {
    id: 'project2',
    name: 'Mobile App Development',
    description: 'Building a new mobile app for client tracking inventory',
    clientName: 'TechStart Inc',
    startDate: '2023-07-15',
    endDate: '2023-10-30',
    teamIds: ['user1', 'user3', 'user4', 'user8', 'user7', 'user10'],
  },
  {
    id: 'project3',
    name: 'Marketing Campaign',
    description: 'Q4 digital marketing campaign for new product launch',
    clientName: 'GrowFast Ltd',
    startDate: '2023-09-01',
    endDate: '2023-12-15',
    teamIds: ['user2', 'user3', 'user6', 'user9', 'user10'],
  },
];

// Sample Tasks
export const tasks: Task[] = [
  // Project 1 Tasks
  {
    id: 'task1',
    projectId: 'project1',
    title: 'Homepage Design',
    description: 'Create wireframes and mockups for the new homepage',
    assigneeId: 'user2',
    estimatedTime: 14400, // 4 hours in seconds
    timeSpent: 18000, // 5 hours in seconds (delayed)
    isCompleted: true,
    dueDate: '2023-06-15',
    createdAt: '2023-06-01',
  },
  {
    id: 'task2',
    projectId: 'project1',
    title: 'Frontend Development',
    description: 'Implement the new design in React',
    assigneeId: 'user1',
    estimatedTime: 86400, // 24 hours in seconds
    timeSpent: 72000, // 20 hours in seconds (ahead of schedule)
    isCompleted: true,
    dueDate: '2023-07-15',
    createdAt: '2023-06-16',
  },
  {
    id: 'task3',
    projectId: 'project1',
    title: 'Content Migration',
    description: 'Transfer all content from old site to new site',
    assigneeId: 'user3',
    estimatedTime: 28800, // 8 hours in seconds
    timeSpent: 25200, // 7 hours in seconds
    isCompleted: false,
    dueDate: '2023-08-01',
    createdAt: '2023-07-16',
  },
  {
    id: 'task8',
    projectId: 'project1',
    title: 'Bug Fixes',
    description: 'Fix critical bugs reported during initial testing',
    assigneeId: 'user1',
    estimatedTime: 18000, // 5 hours in seconds
    timeSpent: 10800, // 3 hours in seconds (ahead)
    isCompleted: false,
    dueDate: '2023-08-15',
    createdAt: '2023-08-01',
  },
  {
    id: 'task9',
    projectId: 'project1',
    title: 'Performance Optimization',
    description: 'Improve page load times and overall site performance',
    assigneeId: 'user1',
    estimatedTime: 21600, // 6 hours in seconds
    timeSpent: 25200, // 7 hours in seconds (behind)
    isCompleted: false,
    dueDate: '2023-08-20',
    createdAt: '2023-08-05',
  },
  {
    id: 'task13',
    projectId: 'project1',
    title: 'Responsive Design Implementation',
    description: 'Ensure the website works well on all devices',
    assigneeId: 'user5',
    estimatedTime: 28800, // 8 hours
    timeSpent: 32400, // 9 hours (slightly behind)
    isCompleted: false,
    dueDate: '2023-08-10',
    createdAt: '2023-07-25',
  },
  {
    id: 'task14',
    projectId: 'project1',
    title: 'Accessibility Compliance',
    description: 'Ensure the website meets WCAG standards',
    assigneeId: 'user6',
    estimatedTime: 21600, // 6 hours
    timeSpent: 18000, // 5 hours (ahead)
    isCompleted: false,
    dueDate: '2023-08-18',
    createdAt: '2023-08-02',
  },
  {
    id: 'task15',
    projectId: 'project1',
    title: 'DevOps Setup',
    description: 'Configure CI/CD pipeline for the new website',
    assigneeId: 'user9',
    estimatedTime: 36000, // 10 hours
    timeSpent: 43200, // 12 hours (behind)
    isCompleted: true,
    dueDate: '2023-07-30',
    createdAt: '2023-07-10',
  },
  
  // Project 2 Tasks
  {
    id: 'task4',
    projectId: 'project2',
    title: 'App Architecture',
    description: 'Design the app architecture and data flow',
    assigneeId: 'user1',
    estimatedTime: 18000, // 5 hours in seconds
    timeSpent: 21600, // 6 hours in seconds (slightly delayed)
    isCompleted: true,
    dueDate: '2023-07-30',
    createdAt: '2023-07-15',
  },
  {
    id: 'task5',
    projectId: 'project2',
    title: 'UI Implementation',
    description: 'Implement all screens based on design mockups',
    assigneeId: 'user4',
    estimatedTime: 108000, // 30 hours in seconds
    timeSpent: 90000, // 25 hours in seconds (ahead)
    isCompleted: true,
    dueDate: '2023-09-15',
    createdAt: '2023-08-01',
  },
  {
    id: 'task10',
    projectId: 'project2',
    title: 'API Integration',
    description: 'Connect app to backend APIs and implement data flow',
    assigneeId: 'user1',
    estimatedTime: 36000, // 10 hours in seconds
    timeSpent: 28800, // 8 hours (ahead)
    isCompleted: false,
    dueDate: '2023-09-25',
    createdAt: '2023-09-01',
  },
  {
    id: 'task11',
    projectId: 'project2',
    title: 'User Authentication',
    description: 'Implement login, registration and profile management',
    assigneeId: 'user8',
    estimatedTime: 28800, // 8 hours in seconds
    timeSpent: 36000, // 10 hours (behind)
    isCompleted: false,
    dueDate: '2023-10-05',
    createdAt: '2023-09-10',
  },
  {
    id: 'task12',
    projectId: 'project2',
    title: 'Testing & QA',
    description: 'Run comprehensive tests and fix any issues found',
    assigneeId: 'user7',
    estimatedTime: 43200, // 12 hours in seconds
    timeSpent: 21600, // 6 hours (halfway there)
    isCompleted: false,
    dueDate: '2023-10-15',
    createdAt: '2023-09-20',
  },
  {
    id: 'task16',
    projectId: 'project2',
    title: 'Offline Mode',
    description: 'Implement offline functionality for the app',
    assigneeId: 'user8',
    estimatedTime: 25200, // 7 hours
    timeSpent: 32400, // 9 hours (behind)
    isCompleted: false,
    dueDate: '2023-10-10',
    createdAt: '2023-09-25',
  },
  {
    id: 'task17',
    projectId: 'project2',
    title: 'App Performance Optimization',
    description: 'Optimize app startup time and overall performance',
    assigneeId: 'user4',
    estimatedTime: 18000, // 5 hours
    timeSpent: 7200, // 2 hours (just started)
    isCompleted: false,
    dueDate: '2023-10-20',
    createdAt: '2023-10-01',
  },
  {
    id: 'task18',
    projectId: 'project2',
    title: 'Product Requirements Review',
    description: 'Review and finalize app requirements with stakeholders',
    assigneeId: 'user10',
    estimatedTime: 10800, // 3 hours
    timeSpent: 14400, // 4 hours (slightly behind)
    isCompleted: true,
    dueDate: '2023-07-25',
    createdAt: '2023-07-18',
  },
  
  // Project 3 Tasks
  {
    id: 'task6',
    projectId: 'project3',
    title: 'Campaign Strategy',
    description: 'Develop the overall strategy for the marketing campaign',
    assigneeId: 'user3',
    estimatedTime: 18000, // 5 hours in seconds
    timeSpent: 14400, // 4 hours in seconds (ahead of schedule)
    isCompleted: true,
    dueDate: '2023-09-15',
    createdAt: '2023-09-01',
  },
  {
    id: 'task7',
    projectId: 'project3',
    title: 'Social Media Graphics',
    description: 'Create graphics for Instagram, Facebook, and Twitter',
    assigneeId: 'user2',
    estimatedTime: 28800, // 8 hours in seconds
    timeSpent: 32400, // 9 hours (slightly behind)
    isCompleted: true,
    dueDate: '2023-10-01',
    createdAt: '2023-09-16',
  },
  {
    id: 'task19',
    projectId: 'project3',
    title: 'Email Campaign Setup',
    description: 'Create and schedule email marketing campaign',
    assigneeId: 'user6',
    estimatedTime: 14400, // 4 hours
    timeSpent: 10800, // 3 hours (ahead)
    isCompleted: false,
    dueDate: '2023-10-10',
    createdAt: '2023-09-25',
  },
  {
    id: 'task20',
    projectId: 'project3',
    title: 'Marketing Analytics Setup',
    description: 'Configure analytics to track campaign performance',
    assigneeId: 'user9',
    estimatedTime: 21600, // 6 hours
    timeSpent: 25200, // 7 hours (behind)
    isCompleted: false,
    dueDate: '2023-10-15',
    createdAt: '2023-10-01',
  },
  {
    id: 'task21',
    projectId: 'project3',
    title: 'Content Calendar',
    description: 'Create content calendar for the campaign',
    assigneeId: 'user6',
    estimatedTime: 10800, // 3 hours
    timeSpent: 14400, // 4 hours (behind)
    isCompleted: true,
    dueDate: '2023-09-20',
    createdAt: '2023-09-10',
  },
  {
    id: 'task22',
    projectId: 'project3',
    title: 'Campaign Budget Review',
    description: 'Review and allocate budget for different campaign aspects',
    assigneeId: 'user10',
    estimatedTime: 7200, // 2 hours
    timeSpent: 5400, // 1.5 hours (ahead)
    isCompleted: true,
    dueDate: '2023-09-10',
    createdAt: '2023-09-05',
  },
];

// Helper functions
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find(project => project.id === projectId);
};

export const getTaskById = (taskId: string): Task | undefined => {
  return tasks.find(task => task.id === taskId);
};

export const getTasksByProjectId = (projectId: string): Task[] => {
  return tasks.filter(task => task.projectId === projectId);
};

export const getTasksByAssigneeId = (userId: string): Task[] => {
  return tasks.filter(task => task.assigneeId === userId);
};

// Add the missing getAllUsers function
export const getAllUsers = (): User[] => {
  return users;
};

// Add a function to get team statistics for dashboard
export const getTeamStatistics = () => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalPlannedTime = tasks.reduce((acc, task) => acc + task.estimatedTime, 0);
  const totalActualTime = tasks.reduce((acc, task) => acc + task.timeSpent, 0);
  
  const teamStats = users.map(user => {
    const userTasks = getTasksByAssigneeId(user.id);
    const completedUserTasks = userTasks.filter(task => task.isCompleted);
    const plannedTime = userTasks.reduce((acc, task) => acc + task.estimatedTime, 0);
    const actualTime = userTasks.reduce((acc, task) => acc + task.timeSpent, 0);
    const efficiency = plannedTime > 0 ? (plannedTime / Math.max(actualTime, 1)) * 100 : 100;
    
    return {
      userId: user.id,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
      totalTasks: userTasks.length,
      completedTasks: completedUserTasks.length,
      completionRate: userTasks.length > 0 ? (completedUserTasks.length / userTasks.length) * 100 : 0,
      plannedTime,
      actualTime,
      efficiency: Math.round(efficiency)
    };
  });
  
  return {
    totalTasks,
    completedTasks,
    completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    totalPlannedTime,
    totalActualTime,
    teamStats
  };
};

// Add a function to get project statistics for dashboard
export const getProjectStatistics = () => {
  return projects.map(project => {
    const projectTasks = getTasksByProjectId(project.id);
    const completedTasks = projectTasks.filter(task => task.isCompleted);
    const plannedTime = projectTasks.reduce((acc, task) => acc + task.estimatedTime, 0);
    const actualTime = projectTasks.reduce((acc, task) => acc + task.timeSpent, 0);
    
    return {
      projectId: project.id,
      projectName: project.name,
      clientName: project.clientName,
      totalTasks: projectTasks.length,
      completedTasks: completedTasks.length,
      completionRate: projectTasks.length > 0 ? (completedTasks.length / projectTasks.length) * 100 : 0,
      plannedTime,
      actualTime,
      variance: actualTime - plannedTime,
      efficiency: plannedTime > 0 ? Math.round((plannedTime / Math.max(actualTime, 1)) * 100) : 100,
      teamSize: project.teamIds.length
    };
  });
};
