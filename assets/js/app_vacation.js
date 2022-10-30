import Alpine from "alpinejs";
import vacation from "./lib/vacation";

// initialize alpine
window.Alpine = Alpine;
Alpine.data("vacation", vacation);
Alpine.start();
