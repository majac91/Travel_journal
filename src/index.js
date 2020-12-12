import "./styles/index.scss";
import img from "./images/sienna.jpg";
import "./icons/font/_flaticon.scss";

import destinationsList from "./js/store.js";
import moduleDestinations from "./js/modules/list.js";
import addNewCity from "./js/modules/add_destination.js";
import events from "./js/modules/pubsub.js";
moduleDestinations.init();
addNewCity.init();

const headerImg = document.querySelector(".header__img");
headerImg.src = img;
