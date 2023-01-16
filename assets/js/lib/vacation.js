// Get amount of days between now and given date.
const getDaysBetween = (date) => {
  const now = new Date();
  const givenDate = new Date(date);

  const timeDiff = givenDate.getTime() - now.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
};

const format = (diffDays) => `${getDaysBetween(diffDays)} Tage`;

const localeDateString = (date, locale = "de-DE") => {
  return new Date(date).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// filter out null values of object
const filterObject = (obj) => {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== "")
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
};

export const store = {
  getDaysBetween: getDaysBetween,
  format: format,
  localeDateString: localeDateString,
  editMode: false,
  generatedLink: null,
  vacationLocation: null,
  date: null,
  submitVactionForm() {
    const date = this.$refs.inputdate.value;
    const vacationLocation = this.$refs.inputvacationlocation.value;
    const params = {
      date,
      vacationLocation,
    };
    console.log(filterObject(params));

    const currentUrl = location.href.replace(location.search, "");
    const newParams = new URLSearchParams(filterObject(params)).toString();
    this.$store.vacation.generatedLink = `${currentUrl}?${newParams}`;
  },
  init() {
    const params = new URL(document.location).searchParams;
    const date = params.get("date");
    const vacationLocation = params.get("vacationLocation");

    if (date) {
      this.date = date;
    } else {
      this.editMode = true;
    }

    if (vacationLocation) {
      this.vacationLocation = vacationLocation;
    }
  },
};
