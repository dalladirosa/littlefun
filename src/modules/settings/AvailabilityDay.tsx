import React from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

import { Checkbox } from "@/components/ui/checkbox";
import AvailabilityDayTimeSlot from "@/modules/settings/AvailabilityDayTimeSlot";
import { DAY_PARSE } from "@/modules/settings/constants";
import { DayParseKey } from "@/modules/settings/SettingForm";
import { calculateEndTime } from "@/utils/calculateEndTime";

type AvailabilityDayProps = {
  day: DayParseKey;
  values: { isAvailable: boolean; timeSlots: { start: string; end: string }[] };
  setAvailability: React.Dispatch<
    React.SetStateAction<{
      [key in DayParseKey]: {
        isAvailable: boolean;
        timeSlots: { start: string; end: string }[];
      };
    }>
  >;
  generalSettings: { duration: string; noBookings: string };
};

const AvailabilityDay = ({
  day,
  values,
  setAvailability,
  generalSettings,
}: AvailabilityDayProps) => {
  const handleChangeCheckbox = (checked: CheckedState) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: checked,
        timeSlots: !checked
          ? []
          : [
              {
                start: "07:00",
                end: calculateEndTime("07:00", generalSettings.duration),
              },
            ],
      },
    }));
  };

  return (
    <div className="grid grid-cols-6 items-center">
      <div className="col-span-1 flex flex-row items-center">
        <Checkbox
          id={DAY_PARSE[day as DayParseKey]}
          className="mr-4"
          checked={values.isAvailable}
          onCheckedChange={handleChangeCheckbox}
        />
        <label
          htmlFor={DAY_PARSE[day as DayParseKey]}
          className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {DAY_PARSE[day as DayParseKey]}
        </label>
      </div>

      {values.isAvailable ? (
        values.timeSlots.map((timeSlot, index) => (
          <AvailabilityDayTimeSlot
            generalSettings={generalSettings}
            day={day}
            key={index}
            index={index}
            timeSlot={timeSlot}
            setAvailability={setAvailability}
          />
        ))
      ) : (
        <p className="text-gray-600">Unavailable</p>
      )}
    </div>
  );
};

export default AvailabilityDay;
