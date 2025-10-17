export const vehicleType = (vehicle) => {
  switch (vehicle) {
    case "bus":
      return "اتوبوس";
    case "ship":
      return "کشتی";
    case "train":
      return "قطار";
    case "SUV":
      return "آفرود";
    case "airplane":
      return "هواپیما";
  }
};
