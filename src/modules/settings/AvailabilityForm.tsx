"use client";
import React from "react";

import AvailabilityDay from "@/modules/settings/AvailabilityDay";
import { DayParseKey } from "@/modules/settings/SettingForm";

export type AvailabilityFormProps = {
  availability: {
    [key in DayParseKey]: {
      isAvailable: boolean;
      timeSlots: { start: string; end: string }[];
    };
  };
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
const AvailabilityForm = ({
  availability,
  setAvailability,
  generalSettings,
}: AvailabilityFormProps) => {
  return (
    <div className="my-8 flex flex-col gap-y-6 rounded-lg border border-zinc-300 bg-white p-4">
      {Object.entries(availability).map(([day, values], index) => (
        <AvailabilityDay
          generalSettings={generalSettings}
          key={index}
          day={day as DayParseKey}
          values={values}
          setAvailability={setAvailability}
        />
      ))}
    </div>
  );
};

export default AvailabilityForm;
