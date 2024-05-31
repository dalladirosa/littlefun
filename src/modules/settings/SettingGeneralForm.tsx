import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VISIT_DURATION_OPTIONS } from "@/modules/settings/constants";
import { DayParseKey } from "@/modules/settings/SettingForm";
import { calculateEndTime } from "@/utils/calculateEndTime";

type SettingGeneralFormProps = {
  generalSettings: { duration: string; noBookings: string };
  setGeneralSettings: React.Dispatch<
    React.SetStateAction<{ duration: string; noBookings: string }>
  >;
  setAvailability: React.Dispatch<
    React.SetStateAction<{
      [key in DayParseKey]: {
        isAvailable: boolean;
        timeSlots: { start: string; end: string }[];
      };
    }>
  >;
};

const SettingGeneralForm = ({
  setGeneralSettings,
  generalSettings,
  setAvailability,
}: SettingGeneralFormProps) => {
  const recalculateTimeSlots = (newDuration: string) => {
    setAvailability((prev) => {
      const newAvailability = { ...prev };

      for (const day in newAvailability) {
        newAvailability[day as DayParseKey].timeSlots = newAvailability[
          day as DayParseKey
        ].timeSlots.map((timeSlot) => {
          let newEndTime = calculateEndTime(timeSlot.start, newDuration);

          // If the new end time exceeds 19:00, subtract the duration from the end time to get the new start time
          if (newEndTime > "20:00") {
            timeSlot.start = calculateEndTime("20:00", "-" + newDuration);
            newEndTime = "20:00";
          }

          return {
            ...timeSlot,
            end: newEndTime,
          };
        });
      }

      return newAvailability;
    });
  };

  const handleChangeDuration = (value: string) => {
    setGeneralSettings((prev) => ({
      ...prev,
      duration: value,
    }));

    recalculateTimeSlots(value);
  };

  const handleChangeNoBookings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the inputted value is a number
    if (!isNaN(Number(value))) {
      setGeneralSettings((prev) => ({
        ...prev,
        noBookings: value,
      }));
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-y-4">
      <div>
        <label htmlFor="visit-duration" className="text-sm">
          Visit Duration
        </label>
        <Select
          name="visit-duration"
          value={generalSettings.duration}
          onValueChange={handleChangeDuration}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(VISIT_DURATION_OPTIONS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="no-booking" className="text-sm">
          No. of Booking/Sessions
        </label>
        <Input
          type="text"
          placeholder="Input"
          name="no-booking"
          value={generalSettings.noBookings}
          onChange={handleChangeNoBookings}
        />
      </div>
    </div>
  );
};

export default SettingGeneralForm;
