export const length = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate) || isNaN(endDate)) {
    console.error("تاریخ وارد شده معتبر نیست");
    return NaN;
  }

  const differenceInTime = endDate - startDate;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
};
