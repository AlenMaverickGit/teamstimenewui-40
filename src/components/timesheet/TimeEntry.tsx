import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface TimeEntryProps {
  value: number; // value in minutes
  onChange: (minutes: number) => void;
  estimatedTime?: number; // planned time in minutes
  completed?: boolean;
}

const TimeEntry: React.FC<TimeEntryProps> = ({
  value,
  onChange,
  estimatedTime,
  completed = false,
}) => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const [hourInput, setHourInput] = useState<string>(hours.toString());
  const [minuteInput, setMinuteInput] = useState<string>(
    minutes.toString().padStart(2, "0")
  );

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value;
    if (newHours === "" || /^\d+$/.test(newHours)) {
      setHourInput(newHours);
      const hourValue = newHours === "" ? 0 : parseInt(newHours, 10);
      const minuteValue = minuteInput === "" ? 0 : parseInt(minuteInput, 10);
      onChange(hourValue * 60 + minuteValue);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value;
    if (newMinutes === "" || /^\d+$/.test(newMinutes)) {
      setMinuteInput(newMinutes);
      const hourValue = hourInput === "" ? 0 : parseInt(hourInput, 10);
      let minuteValue = newMinutes === "" ? 0 : parseInt(newMinutes, 10);

      // Handle overflow
      if (minuteValue >= 60) {
        minuteValue = 59;
        setMinuteInput("59");
      }

      onChange(hourValue * 60 + minuteValue);
    }
  };

  // Calculate if over or under estimated time
  const getTimeComparisonClass = () => {
    if (!estimatedTime || estimatedTime === 0) return "";
    const currentValue =
      parseInt(hourInput || "0") * 60 + parseInt(minuteInput || "0");
    if (currentValue > estimatedTime) return "border-orange-400";
    if (currentValue < estimatedTime && currentValue > 0)
      return "border-green-400";
    return "";
  };

  return (
    <div className="flex items-center w-full justify-center">
      <div
        className={`flex gap-1 items-center border rounded-md px-2 py-1 ${getTimeComparisonClass()}`}
      >
        <Input
          type="text"
          value={hourInput}
          onChange={handleHourChange}
          className="w-12 text-center p-1 h-8 border-0"
          disabled={completed}
          placeholder="0"
        />
        <span className="text-muted-foreground">h</span>
        <Input
          type="text"
          value={minuteInput}
          onChange={handleMinuteChange}
          className="w-12 text-center p-1 h-8 border-0"
          disabled={completed}
          placeholder="00"
        />
        <span className="text-muted-foreground">m</span>
      </div>
    </div>
  );
};

export default TimeEntry;
