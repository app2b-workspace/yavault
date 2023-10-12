export const readableDate = (now: Date, aDate: Date): string => {
  const isToday = aDate.toDateString() === now.toDateString();
  const formattedTime = `${aDate.getHours().toString().padStart(2, '0')}:${aDate
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return isToday ? formattedTime : aDate.toISOString();
};
