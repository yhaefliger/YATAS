// lowercase and replace spaces with underscores
export const ressourceToSafeName = (ressource_name) =>
  ressource_name.toLowerCase().replace(/\s/g, "_");

export const getByName = ({ ressources }, name) =>
  ressources.find((r) => r.name === name);

export const minMaxAveragePrice = (priceHistory) => {
  const prices = priceHistory.map(({ value }) => parseInt(value));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const average = Math.round(
    prices.reduce((acc, curr) => acc + curr, 0) / prices.length
  );
  return { min, max, average };
};

export const addPriceHistory = (store, ressourceName, { value }) => {
  const ressourceFound = getByName(store, ressourceName);
  const priceHistory = [...ressourceFound.priceHistory, { value }];

  const modifiedRessource = {
    ...ressourceFound,
    priceHistory,
    ...minMaxAveragePrice(priceHistory),
  };

  console.log({ modifiedRessource });

  // return replaced ressources
  return store.ressources.map((r) =>
    r.name === ressourceName ? modifiedRessource : r
  );
};
