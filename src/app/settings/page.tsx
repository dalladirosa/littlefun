"use client";
import React from "react";

import SettingForm from "@/modules/settings/SettingForm";

const SettingPage = () => {
  return (
    <div className="container flex h-screen bg-gray-300/10 py-6">
      <div className="flex w-full flex-col">
        <h1>Settings</h1>

        <SettingForm />
      </div>
    </div>
  );
};

export default SettingPage;
