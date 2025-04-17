
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');
  
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};

export const formatTimeHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return `${hours}h ${minutes}m`;
};

export const calculateProgress = (
  timeSpent: number, 
  estimatedTime: number
): number => {
  if (estimatedTime === 0) return 0;
  return Math.min(Math.round((timeSpent / estimatedTime) * 100), 100);
};

export const getStatusFromProgress = (
  progress: number, 
  isCompleted: boolean
): 'notstarted' | 'inprogress' | 'delayed' | 'complete' => {
  if (isCompleted) return 'complete';
  if (progress === 0) return 'notstarted';
  if (progress > 100) return 'delayed';
  return 'inprogress';
};

export const getStatusColor = (
  status: 'notstarted' | 'inprogress' | 'delayed' | 'complete'
): string => {
  switch (status) {
    case 'notstarted': return 'bg-status-notstarted';
    case 'inprogress': return 'bg-status-inprogress';
    case 'delayed': return 'bg-status-delayed';
    case 'complete': return 'bg-status-complete';
    default: return 'bg-gray-200';
  }
};

export const getStatusText = (
  status: 'notstarted' | 'inprogress' | 'delayed' | 'complete'
): string => {
  switch (status) {
    case 'notstarted': return 'Not Started';
    case 'inprogress': return 'In Progress';
    case 'delayed': return 'Delayed';
    case 'complete': return 'Complete';
    default: return 'Unknown';
  }
};

// Get day names for timesheet
export const getDayNames = (): string[] => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
};

// Convert minutes to hours and minutes string format
export const minutesToHoursAndMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
