interface WasteData {
  type: string;
  name: string;
}

interface GroupedWasteData {
  [type: string]: WasteData[];
}

/**
 * Groups an array of waste data objects by their type.
 * @param wasteData - An array of waste data objects.
 * @returns An object where each key is a waste type and its value is an array of waste data objects of that type.
 */
export const groupByWasteType = (wasteData: WasteData[]): GroupedWasteData => {
  const groupedByWasteType: GroupedWasteData = {};

  wasteData.forEach((item) => {
    const { type } = item;

    if (!groupedByWasteType.hasOwnProperty(type)) {
      groupedByWasteType[type] = [];
    }

    groupedByWasteType[type] = [...groupedByWasteType[type], item];
  });

  return groupedByWasteType;
};
