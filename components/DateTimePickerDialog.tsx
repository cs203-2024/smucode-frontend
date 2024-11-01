"use client";

import { Calendar as CalendarIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogOverlay, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Adjust this import according to your UI library
import { useState } from "react";
import { Input } from "./ui/input";

// Define Types
interface DateTimePickerDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  updateRoundName: string;
  setUpdateRoundName: (name: string) => void;
  startDate: Date | undefined;
  handleStartDateChange: (date: Date | undefined) => void;
  startTime: string;
  handleStartTimeChange: (time: string) => void;
  endDate: Date | undefined;
  handleEndDateChange: (date: Date | undefined) => void;
  endTime: string;
  handleEndTimeChange: (time: string) => void;
  isEndingRound: boolean;
  handleEditRound: () => void;
  dateError: string;
}

// Main Combined Component
const DateTimePickerDialog: React.FC<DateTimePickerDialogProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  updateRoundName,
  setUpdateRoundName,
  startDate,
  handleStartDateChange,
  startTime,
  handleStartTimeChange,
  endDate,
  handleEndDateChange,
  endTime,
  handleEndTimeChange,
  isEndingRound,
  handleEditRound,
  dateError,
}) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <DialogContent className="bg-white p-6 rounded-md shadow-md">
          <DialogTitle className="font-medium text-sm">Update Round Details</DialogTitle>
          <div className='text-sm m-6'>
            <p className="mt-3 mb-1">Round Name</p>
            <Input
              type="text"
              className="w-[344px] p-2 border border-gray-300 rounded-md"
              value={updateRoundName}
              onChange={(e) => setUpdateRoundName(e.target.value)}
            />
            <p className='mt-2 mb-1'>Start Date & Time</p>
            <div onClick={(e) => e.stopPropagation()}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-[240px] justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? startDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className='mt-2 mb-1'>End Date & Time</p>
            <div onClick={(e) => e.stopPropagation()}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-[240px] justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? endDate.toDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className='mt-4 mb-2 text-red-500'>{dateError}</p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button className="w-[150px]" onClick={handleEditRound} disabled={isEndingRound}>
              {isEndingRound ? (<LoaderCircle className="animate-spin" color="#FFF" />) : ("Update")}
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default DateTimePickerDialog;
