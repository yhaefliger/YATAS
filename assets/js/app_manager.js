import Alpine from "alpinejs";
import { store as managerStore } from "./lib/manager";

// initialize alpine
window.Alpine = Alpine;
Alpine.store("manager", managerStore);
Alpine.start();
