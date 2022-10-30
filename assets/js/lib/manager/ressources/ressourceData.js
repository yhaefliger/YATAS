import { ressourceToSafeName } from "./utils";

// TODO use `pathPrefix` from `.eleventy.js`
const addPathPrefix = (path, pathPrefix = "/") =>
  `${pathPrefix}img/manager/${path}`;

export const toFileName = (ressource_name) => {
  return addPathPrefix(`${ressourceToSafeName(ressource_name)}.png`);
};

const transform = (ressource_name, _index, _all_resources, mock = false) => {
  return {
    name: ressource_name,
    path: toFileName(ressource_name),
    visible: mock ? Math.random() > 0.5 : false,
    priceHistory: mock
      ? [
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
          {
            value: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
          },
        ]
      : [],
  };
};

export const initialRessources = [
  "Energium",
  "Energy Rod",
  "Hyperium",
  "Hyperfuel",
  "Electronics Component",
  "Raw Chemicals",
  "Chemicals",
  "Artificial Meat",
  "Fabrics",
  "Fertilizer",
  "Fibers",
  "Fruit",
  "Infra Block",
  "Nuts and Seeds",
  "Root Vegetables",
  "Space Food",
  "Tech Block",
  "Base Metals",
  "Noble Metals",
  "Optronics Component",
  "Ice",
  "Water",
].map(transform);

export const recipes = {
  Hyperfuel: [
    {
      name: "Hyperium",
      amount: 2,
    },
  ],
  "Energy Rod": [
    {
      name: "Energium",
      amount: 0.5,
    },
  ],
  Chemicals: [
    {
      name: "Raw Chemicals",
      amount: 0.5,
    },
  ],
  "Electronics Component": [
    {
      name: "Base Metals",
      amount: 0.2,
    },
    {
      name: "Noble Metals",
      amount: 0.2,
    },
  ],
  "Tech Block": [
    {
      name: "Infra Block",
      amount: 1,
    },
    {
      name: "Optronics Component",
      amount: 1,
    },
  ],
  Water: [
    {
      name: "Ice",
      amount: 0.2,
    },
  ],
};
