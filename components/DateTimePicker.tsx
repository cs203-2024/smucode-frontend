"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

// Define Types
interface DateTimePickerProps {
  initialDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  initialTime?: string;
  onTimeChange: (time: string) => void;
}

// Main DateTimePicker Component
export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  initialDate,
  onDateChange,
  initialTime = "09:00",
  onTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>(initialTime);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-[240px] justify-start text-left font-normal ${
                  !selectedDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? selectedDate.toDateString() : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Time Picker */}
          <input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
