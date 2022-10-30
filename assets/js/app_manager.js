import Alpine from "alpinejs";
import { data as managerData, store as managerStore } from "./lib/manager";

// initialize alpine
window.Alpine = Alpine;
Alpine.store("manager", managerStore);
Alpine.data("manager", managerData);
Alpine.start();
