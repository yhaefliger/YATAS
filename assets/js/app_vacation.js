import Alpine from "alpinejs";
import { store as vacationStore } from "./lib/vacation";

// initialize alpine
window.Alpine = Alpine;
Alpine.store("vacation", vacationStore);
Alpine.start();
