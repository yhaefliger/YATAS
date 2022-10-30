// Get amount of days between now and given date.
const getDaysBetween = (date) => {
  const now = new Date();
  const givenDate = new Date(date);

  const timeDiff = givenDate.getTime() - now.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
};

const format = (diffDays) => `${getDaysBetween(diffDays)} Tage`;

export default () => ({
  getDaysBetween: getDaysBetween,
  format: format,
});
