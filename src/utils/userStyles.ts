
/**
 * Utility functions for consistent user styling across the application
 */

/**
 * Gets a consistent color for avatar backgrounds based on user initials
 */
export const getAvatarColor = (initials: string) => {
  const colors = [
    "bg-primary/10 text-primary",
    "bg-red-100 text-red-600",
    "bg-amber-100 text-amber-600",
    "bg-emerald-100 text-emerald-600",
    "bg-blue-100 text-blue-600",
    "bg-indigo-100 text-indigo-600",
    "bg-purple-100 text-purple-600",
  ];

  // Simple hash function to deterministically assign colors
  const hash = initials.charCodeAt(0) % colors.length;
  return colors[hash];
};

/**
 * Gets role badge styling based on user role
 */
export const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-600 border-red-200";
    case "Project Manager":
      return "bg-amber-100 text-amber-600 border-amber-200";
    case "Team Member":
      return "bg-blue-100 text-blue-600 border-blue-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

/**
 * Gets workload status color for team member badges
 */
export const getWorkloadStatusColor = (status: string) => {
  switch (status) {
    case "overloaded":
      return "bg-status-delayed text-white";
    case "busy":
      return "bg-amber-500 text-white";
    case "normal":
      return "bg-status-inprogress text-white";
    case "available":
      return "bg-status-complete text-white";
    default:
      return "bg-gray-200";
  }
};
