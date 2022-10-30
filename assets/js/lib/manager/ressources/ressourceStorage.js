import { minMaxAveragePrice } from "./utils";
import { initialRessources, toFileName } from "./ressourceData";

/**
 * Loads ressources from LocalStorage if they exist,
 * otherwise returns the initial ressources.
 * @returns {Array} ressources
 */
export const maybeLoadRessourcesFromStorage = () => {
  const ressourcesFromStorage = localStorage.getItem("ressources");
  let ressourcesToApply = [];

  if (ressourcesFromStorage && ressourcesFromStorage.length) {
    console.info("Loading your ressources from local storage...");
    const ressourcesFromSavegame = JSON.parse(ressourcesFromStorage);
    console.debug({ ressourcesFromSavegame });

    const ressourcesUpdateCompleted = maybeUpdateRessources(
      ressourcesFromSavegame,
      initialRessources
    );
    console.debug({ ressourcesUpdateCompleted });

    ressourcesToApply = ressourcesUpdateCompleted;
    console.log("✅ Loading Done!");
  } else {
    ressourcesToApply = initialRessources;
  }

  return ressourcesToApply
    .map((r) => ({
      ...r,
      ...minMaxAveragePrice(r.priceHistory),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Adding any new ressources that are not in the savegame
const maybeUpdateRessources = (ressourcesFromSavegame, initialRessources) => {
  // filter ressources wiht different filename
  const newRessourcesAfterUpdate = initialRessources.filter(
    ({ name: nameUpdate }) => {
      console.debug(`is ${nameUpdate} in savegame?`);
      const result = !!ressourcesFromSavegame.find(
        ({ name: nameSavegame }) => nameUpdate === nameSavegame
      );
      console.debug(result);
      return !result;
    }
  );

  // migrate path to new path
  const newRessourcesWithNewPath = newRessourcesAfterUpdate
    .map((ressource) => {
      const newPath = toFileName(ressource.name);
      return {
        ...ressource,
        path: newPath,
      };
    })
    .filter(({ path }) => path);

  return [
    ...ressourcesFromSavegame,
    ...newRessourcesAfterUpdate,
    ...newRessourcesWithNewPath,
  ];
};
