import React from "react";

import { CirclePlus, CircleX, Files } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIME_OPTIONS } from "@/modules/settings/constants";
import { DayParseKey } from "@/modules/settings/SettingForm";
import { calculateEndTime } from "@/utils/calculateEndTime";

type AvailabilityDayTimeSlotProps = {
  day: DayParseKey;
  timeSlot: { start: string; end: string };
  setAvailability: React.Dispatch<
    React.SetStateAction<{
      [key in DayParseKey]: {
        isAvailable: boolean;
        timeSlots: { start: string; end: string }[];
      };
    }>
  >;
  index: number;
  generalSettings: { duration: string; noBookings: string };
};

const AvailabilityDayTimeSlot = ({
  day,
  timeSlot,
  setAvailability,
  index: timeSlotIndex,
  generalSettings,
}: AvailabilityDayTimeSlotProps) => {
  const handleAddTimeSlot = () => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [
          ...prev[day].timeSlots,
          {
            start: "07:00",
            end: calculateEndTime("07:00", generalSettings.duration),
          },
        ],
      },
    }));
  };

  const handleCopyTimeSlot = () => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [
          ...prev[day].timeSlots,
          { start: timeSlot.start, end: timeSlot.end },
        ],
      },
    }));
  };

  const handleDeleteTimeSlot = () => {
    setAvailability((prev) => {
      const newTimeSlots = prev[day].timeSlots.filter(
        (_, index) => index !== timeSlotIndex,
      );

      return {
        ...prev,
        [day]: {
          ...prev[day],
          isAvailable: newTimeSlots.length > 0,
          timeSlots: newTimeSlots,
        },
      };
    });
  };

  const handleChangeStartTimeSlot = (value: string) => {
    setAvailability((prev) => {
      const newTimeSlots = prev[day].timeSlots.map((timeSlot, index) =>
        index === timeSlotIndex
          ? {
              ...timeSlot,
              start: value,
              end: calculateEndTime(value, generalSettings.duration),
            }
          : timeSlot,
      );
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeSlots: newTimeSlots,
        },
      };
    });
  };

  // Calculate the latest start time based on the duration
  const latestStartTime = calculateEndTime(
    "19:00",
    "-" + generalSettings.duration,
  );

  return (
    <div className="col-span-5 col-start-2 mb-2 flex flex-row items-center">
      <Select
        name="start-time-slot"
        value={timeSlot.start}
        defaultValue="07:00"
        onValueChange={handleChangeStartTimeSlot}
      >
        <SelectTrigger className="mr-1 w-[180px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TIME_OPTIONS)
            .filter(([value]) => value <= latestStartTime)
            .map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      -
      <Select
        name="end-time-slot"
        value={timeSlot.end}
        defaultValue="07:00"
        disabled
      >
        <SelectTrigger className="ml-1 w-[180px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(TIME_OPTIONS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={handleDeleteTimeSlot}
      >
        <CircleX className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={handleCopyTimeSlot}
      >
        <Files className="size-4" />
      </Button>
      <Button
        variant="ghost"
        className="ml-6 rounded-full"
        onClick={handleAddTimeSlot}
      >
        <CirclePlus className="size-4" />
      </Button>
    </div>
  );
};

export default AvailabilityDayTimeSlot;
