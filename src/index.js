import "./styles/index.scss";
import destinationsList from "./js/store.js";
import moduleDestinations from "./js/modules/list.js";
import addNewCity from "./js/modules/add_destination.js";
import events from "./js/modules/pubsub.js";
moduleDestinations.init();
addNewCity.init();
