export const groupByWasteType = (wasteData: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  wasteData.forEach((item) => {
    const key = item.waste;
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });

  return grouped;
};
