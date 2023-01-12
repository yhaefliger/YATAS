// Get amount of days between now and given date.
const getDaysBetween = (date) => {
  const now = new Date();
  const givenDate = new Date(date);

  const timeDiff = givenDate.getTime() - now.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
};

const format = (diffDays) => `${getDaysBetween(diffDays)} Tage`;

export const store = {
  getDaysBetween: getDaysBetween,
  format: format,
  editMode: false,
  generatedLink: null,
  date: null,
  submitVactionForm() {
    const date = this.$refs.inputdate.value;
    const currentUrl = location.href.replace(location.search, "");
    const newParams = new URLSearchParams({ date }).toString();
    this.$store.vacation.generatedLink = `${currentUrl}?${newParams}`;
  },
  init() {
    const params = new URL(document.location).searchParams;
    const date = params.get("date");

    if (date) {
      this.date = date;
    } else {
      this.editMode = true;
    }
  },
};
