"use client"
import { DateTimePicker } from '@/components/DateTimePicker'
import React, { useState, useEffect } from 'react'


const TournamentBrawl = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("09:00");
  const [dateError, setDateError ] = useState<string>("");
  const handleStartDateChange = (newDate: Date | undefined) => {
    setStartDate(newDate);
  };

  const handleStartTimeChange = (newTime: string) => {
    setStartTime(newTime);
  };

  const handleEndDateChange = (newDate: Date | undefined) => {
    setEndDate(newDate);
  };

  const handleEndTimeChange = (newTime: string) => {
    setEndTime(newTime);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const startDateTime = new Date(startDate);
      startDateTime.setHours(startHours, startMinutes);

      const endDateTime = new Date(endDate);
      endDateTime.setHours(endHours, endMinutes);

      if (endDateTime <= startDateTime) {
        setDateError("End date/time is before start date/time.");
        // You can also set an error state or show a message to the user here.
      } else {
        setDateError("");
      }
    }
  }, [startDate, endDate, startTime, endTime]);

  return (
    <>
    <div className='text-sm'>
      <p className='mt-2 mb-1'>Start Date & Time</p>
      <DateTimePicker
        initialDate={startDate}
        onDateChange={handleStartDateChange}
        initialTime={startTime}
        onTimeChange={handleStartTimeChange}
      />
      <p className='mt-2 mb-1'>End Date & Time</p>
      <DateTimePicker
        initialDate={endDate}
        onDateChange={handleEndDateChange}
        initialTime={endTime}
        onTimeChange={handleEndTimeChange}
      />
      <p className='mt-4 text-red-500'>{dateError}</p>
    </div>
    
    </>
  );
};

export default TournamentBrawl;
