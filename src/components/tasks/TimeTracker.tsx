
import React, { useState, useEffect } from 'react';
import { formatTime } from '@/utils/timeUtils';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface TimeTrackerProps {
  initialTime: number;
  onTimeUpdate: (newTime: number) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ initialTime, onTimeUpdate }) => {
  const [elapsedTime, setElapsedTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const [timerStartedAt, setTimerStartedAt] = useState(Date.now());
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        const newTime = initialTime + Math.floor((Date.now() - timerStartedAt) / 1000);
        setElapsedTime(newTime);
        onTimeUpdate(newTime);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, initialTime, onTimeUpdate, timerStartedAt]);
  
  // Start running automatically when the component mounts
  useEffect(() => {
    setTimerStartedAt(Date.now());
    setIsRunning(true);
    
    return () => {
      setIsRunning(false);
    };
  }, []);
  
  return (
    <Card className="p-2 flex items-center justify-center bg-primary text-primary-foreground">
      <Clock className="h-4 w-4 mr-2" />
      <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
    </Card>
  );
};

export default TimeTracker;
