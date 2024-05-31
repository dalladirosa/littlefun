export const calculateEndTime = (startTime: string, duration: string) => {
  const [startHour, startMinutes] = startTime.split(":").map(Number);
  const durationInMinutes = Number(duration);

  const date = new Date();
  date.setHours(startHour, startMinutes);

  date.setMinutes(date.getMinutes() + durationInMinutes);

  const endHour = date.getHours().toString().padStart(2, "0");
  const endMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${endHour}:${endMinutes}`;
};
