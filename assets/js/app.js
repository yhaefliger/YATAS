import Alpine from "alpinejs";
import "vanilla-cookieconsent";
import ccOptions from "./lib/cookie_consent";
import vacation from "./lib/vacation";
import projectManager from "./lib/project_manager";

// https://github.com/orestbida/cookieconsent
const cc = initCookieConsent();
cc.run(ccOptions);

// initialize alpine
window.Alpine = Alpine;
Alpine.data("vacation", vacation);
Alpine.data("projectManager", projectManager);
Alpine.start();
