export const daysUntil = (targetDateString: string): number | string => {
  const [day, month, year] = targetDateString
    .split(".")
    .map((num) => parseInt(num, 10));
  const targetDate = new Date(year, month - 1, day);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Oblicz różnicę w milisekundach i przekształć na dni
  const differenceInMilliseconds = targetDate.getTime() - currentDate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.ceil(differenceInDays);
};
