"use client";
import React, { useState } from "react";

import useIsomorphicEffect from "@/hooks/useIsomorphicEffect";
import AvailabilityForm from "@/modules/settings/AvailabilityForm";
import { DAY_PARSE } from "@/modules/settings/constants";
import SettingGeneralForm from "@/modules/settings/SettingGeneralForm";
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";

export type DayParseKey = keyof typeof DAY_PARSE;

const SettingForm = () => {
  const [generalSettings, setGeneralSettings] = useState({
    duration: "",
    noBookings: "",
  });

  const [availability, setAvailability] = useState<{
    [key in DayParseKey]: {
      isAvailable: boolean;
      timeSlots: { start: string; end: string }[];
    };
  }>({
    monday: { isAvailable: false, timeSlots: [] },
    tuesday: { isAvailable: false, timeSlots: [] },
    wednesday: { isAvailable: false, timeSlots: [] },
    thursday: { isAvailable: false, timeSlots: [] },
    friday: { isAvailable: false, timeSlots: [] },
    saturday: { isAvailable: false, timeSlots: [] },
    sunday: { isAvailable: false, timeSlots: [] },
  });

  useIsomorphicEffect(() => {
    setGeneralSettings(loadFromLocalStorage("generalSettings"));
  }, []);

  useIsomorphicEffect(() => {
    setAvailability(loadFromLocalStorage("availability"));
  }, []);

  useIsomorphicEffect(() => {
    saveToLocalStorage("generalSettings", generalSettings);
  }, [generalSettings]);

  useIsomorphicEffect(() => {
    saveToLocalStorage("availability", availability);
  }, [availability]);

  return (
    <div>
      <SettingGeneralForm
        generalSettings={generalSettings}
        setAvailability={setAvailability}
        setGeneralSettings={setGeneralSettings}
      />

      <AvailabilityForm
        generalSettings={generalSettings}
        availability={availability}
        setAvailability={setAvailability}
      />
    </div>
  );
};

export default SettingForm;
