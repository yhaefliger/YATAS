import {
  addPriceHistory,
  getByName,
  maybeLoadRessourcesFromStorage,
  recipes,
  ressourceToSafeName,
} from "./manager/ressources";
import {
  getFirstAndLast,
  getKeyboardFocussableElements,
} from "./manager/utils";
import Chart from "chart.js/auto";

const version = 1;

export const store = {
  modalVisible: false,
  changeVisibility: false,
  ressources: [],
  version: version,
  getByName,
  ressourceToSafeName,
  init() {
    this.ressources = maybeLoadRessourcesFromStorage();
  },
  persist(_ressources) {
    const previousState = JSON.parse(localStorage.getItem("ressources"));
    console.log({ previousState });
    const stateToSave = this.ressources;
    console.log({ stateToSave });

    if (JSON.stringify(previousState) !== JSON.stringify(stateToSave)) {
      console.info("Saving your state...");
      localStorage.setItem("ressources", JSON.stringify(stateToSave));
      console.log("✅ Saving Done!");
    }
  },
  clearStorage() {
    console.info("Clearing your state...");
    localStorage.clear();
    location.reload();
  },
  onClickToggleChangeVisibility() {
    this.$store.manager.changeVisibility =
      !this.$store.manager.changeVisibility;

    this.$nextTick(() => {
      document.querySelector(".ressources__item > button").focus();
    });
  },
  toggleRessourceVisibility({ name }) {
    this.ressources = this.ressources.map((r) => {
      if (r.name === name) {
        return {
          ...r,
          visible: !r.visible,
        };
      }
      return r;
    });
  },
  showAddPriceModal({ detail: { name } }) {
    const ressource = {
      ...getByName(this.$store.manager, name),
      recipe: name && recipes[name],
    };
    const { priceHistory, average } = ressource;

    console.log(ressource);

    // Chart initialisation
    const ctx = this.$root.querySelector("#priceHistoryChart");
    Chart.defaults.font.size = 16;
    Chart.defaults.color = "rgba(165, 243, 252, 0.8)";
    this.$store.manager.priceHistoryChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...priceHistory.keys()],
        datasets: [
          {
            label: "Prices of " + name,
            backgroundColor: "rgba(165, 243, 252, 0.8)",
            borderColor: "rgba(165, 243, 252, 0.8)",
            data: priceHistory.map((p) => p.value),
          },
          /* {
            label: "Average Price of " + name,
            backgroundColor: "rgba(165, 243, 252, 0.6)",
            borderColor: "rgba(165, 243, 252, 0.6)",
            data: [...priceHistory.map((_p) => average)],
          }, */
        ],
      },
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0.3,
          },
        },
      },
    });

    this.$store.manager.modalVisible = true;
    this.$nextTick(() => {
      this.ressource = ressource;
      // remember last focused element
      this.$store.manager.lastFocusedElement = document.activeElement;
      this.$refs.input.focus();
    });
  },
  submitAddPriceModal({ detail: { name } }) {
    const value = this.$refs.input.value;

    const newRessources = addPriceHistory(this.$store.manager, name, {
      value,
    });

    this.$store.manager.ressources = newRessources;

    this.$nextTick(() => {
      this.$store.manager.modalVisible = false;
      this.$refs.input.value = "";
      this.$store.manager.priceHistoryChart.destroy();
      this.$store.manager.lastFocusedElement.focus();
    });

    /*  console.log("adding to", name);
    

    console.log(this.$store.manager.ressources[0]); */
  },
  hideAddPriceModal(_e) {
    this.ressource = {};
    this.$refs.input.value = "";
    this.$store.manager.priceHistoryChart.destroy();
    this.$nextTick(() => {
      this.$store.manager.modalVisible = false;
      this.$store.manager.lastFocusedElement.focus();
    });
  },
  handleTabModal(e) {
    const elems = getKeyboardFocussableElements(this.$root);
    const { first, last } = getFirstAndLast(elems);

    // as AlpineJS doesn't support an exact modifier, we need to check on the `shiftKey`
    // -> https://github.com/alpinejs/alpine/issues/273
    if (document.activeElement === last && !e.shiftKey) {
      first.focus();
      e.preventDefault();
    }
  },
  handleShiftTabModal(e) {
    const elems = getKeyboardFocussableElements(this.$root);
    const { first, last } = getFirstAndLast(elems);

    if (document.activeElement === first) {
      last.focus();
      e.preventDefault();
    }
  },
};
