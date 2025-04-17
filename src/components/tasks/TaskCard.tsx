
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, User, PlayCircle, PauseCircle, CheckCircle } from 'lucide-react';
import { Task, getUserById, getProjectById } from '@/utils/dummyData';
import { calculateProgress, formatTimeHoursMinutes, getStatusFromProgress, getStatusText } from '@/utils/timeUtils';
import { format } from 'date-fns';
import TimeTracker from './TimeTracker';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [localTask, setLocalTask] = useState<Task>(task);
  
  const assignee = getUserById(task.assigneeId);
  const project = getProjectById(task.projectId);
  
  const progress = calculateProgress(localTask.timeSpent, localTask.estimatedTime);
  const status = getStatusFromProgress(progress, localTask.isCompleted);
  
  const toggleTimer = () => {
    setIsTracking(!isTracking);
  };
  
  const updateTimeSpent = (newTimeSpent: number) => {
    setLocalTask(prev => ({ ...prev, timeSpent: newTimeSpent }));
  };
  
  const toggleCompleted = () => {
    setLocalTask(prev => ({ ...prev, isCompleted: !prev.isCompleted }));
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3 className="font-medium text-lg">{localTask.title}</h3>
              <p className="text-sm text-muted-foreground">{localTask.description}</p>
            </div>
            <Badge 
              variant="outline" 
              className={`${
                status === 'complete' 
                  ? 'bg-status-complete text-white' 
                  : status === 'delayed'
                    ? 'bg-status-delayed text-white'
                    : status === 'inprogress'
                      ? 'bg-status-inprogress text-white'
                      : 'bg-status-notstarted text-white'
              }`}
            >
              {getStatusText(status)}
            </Badge>
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Progress ({progress}%)
              </span>
              <span className="text-sm font-medium">
                {formatTimeHoursMinutes(localTask.timeSpent)} / {formatTimeHoursMinutes(localTask.estimatedTime)}
              </span>
            </div>
            <Progress value={progress > 100 ? 100 : progress} className="mt-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{assignee?.name || 'Unassigned'}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Due: {format(new Date(localTask.dueDate), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{project?.name}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pt-2">
            <div className="w-full sm:w-auto">
              {isTracking ? (
                <TimeTracker 
                  initialTime={localTask.timeSpent} 
                  onTimeUpdate={updateTimeSpent}
                />
              ) : null}
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant={isTracking ? "destructive" : "outline"} 
                size="sm" 
                className="flex-1 sm:flex-none"
                onClick={toggleTimer}
                disabled={localTask.isCompleted}
              >
                {isTracking ? (
                  <>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Stop Timer
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Timer
                  </>
                )}
              </Button>
              
              <Button 
                variant={localTask.isCompleted ? "outline" : "default"} 
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={toggleCompleted}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {localTask.isCompleted ? 'Reopen' : 'Complete'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
