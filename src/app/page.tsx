"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {" "}
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </main>
  );
}
