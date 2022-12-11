/**
 * lowercase and replace spaces with underscores
 * @param {String} ressource_name
 * @returns safe ressource name
 */
export const ressourceToSafeName = (ressource_name) =>
  ressource_name.toLowerCase().replace(/\s/g, "_");

/**
 * Finds a ressource by name
 * @param {Object} store
 * @param {Object} store.ressources ressources in store
 * @param {String} name ressource name to find
 * @returns {Object | undefined} ressource if found
 */
export const getByName = ({ ressources }, name) =>
  ressources.find((r) => r.name === name);

/**
 * get min, max and average prices
 * @param {Array.<{value: Number}>} priceHistory
 * @returns {Object} {min, max, average}
 */
export const minMaxAveragePrice = (priceHistory) => {
  const prices = priceHistory.map(({ value }) => parseInt(value));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average = Math.round(
    prices.reduce((acc, curr) => acc + curr, 0) / prices.length
  );
  return { min, max, average };
};

/**
 * returns replaced ressources, also adding priceHistory and min, max, average
 * @param {Object} store
 * @param {String} ressourceName
 * @param {Object} price
 * @param {Number} price.value
 * @returns {Array.<Object>} modified ressources
 */
// TODO this function should be refactored into a redux style reducer, returning a new store
export const addPriceHistory = (store, ressourceName, { value }) => {
  const ressourceFound = getByName(store, ressourceName);
  const priceHistory = [...ressourceFound.priceHistory, { value }];

  const modifiedRessource = {
    ...ressourceFound,
    priceHistory,
    ...minMaxAveragePrice(priceHistory),
  };

  // return replaced ressources
  return store.ressources.map((r) =>
    r.name === ressourceName ? modifiedRessource : r
  );
};
