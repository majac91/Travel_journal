import { deleteItem, toggleButtonHome } from "../store.js";
import events from "./pubsub.js";

// Create gallery elements and render them

//Variables
let buttons;
let home;
let places;
let add;
let all;
let gallery;
let activeBtn;
let storedList;
let form;
let closeFormBtn;
let navbar;

function cacheDom() {
  buttons = Array.from(document.querySelector(".main-btns").children);
  console.log(buttons);
  all = buttons[0];
  home = buttons[1];
  places = buttons[2];
  add = buttons[3];
  navbar = document.querySelector(".navbar");
  gallery = document.querySelector(".gallery");
  activeBtn = null;
  form = document.getElementById("add-photo-form");
  closeFormBtn = document.getElementById("close");
}

function bindEvents() {
  home.addEventListener("click", addClassHome);
  places.addEventListener("click", addClassPlaces);
  all.addEventListener("click", showAll);
  add.addEventListener("click", openForm);
  closeFormBtn.addEventListener("click", closeForm);
  document.addEventListener("DOMContentLoaded", setActive);
  document.addEventListener("scroll", shrinkNav);
  window.addEventListener("scroll", restoreNav);
  events.subscribe("listRetreived", (list) => {
    storedList = list;
    render();
  });
}

function renderDestination(destination) {
  // create destination wrapper
  const elDestination = document.createElement("figure");
  elDestination.classList.add("gallery-img__container");

  // add the correct class to elDestination wrapper
  destination.home === true
    ? elDestination.classList.add("home")
    : elDestination.classList.add("places");

  // create img element
  const img = document.createElement("img");
  img.src = destination.photo;
  img.classList.add("gallery-img");

  //create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("gallery-checkbox");
  //check all home list checkboxes
  if (destination.home) {
    checkbox.setAttribute("checked", "checked");
  }

  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("gallery-delete-btn");
  deleteBtn.innerText = "Delete"; //RESTORE DELETE BTN

  //create img dropdown menu
  const dropdown = document.createElement("div");
  // dropdown.type = "button";
  dropdown.classList.add("gallery-dropdown-icon");

  //create figure caption
  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("caption__container");
  //set captions in a div
  const captionTxt = document.createElement("div");
  captionTxt.classList.add("caption__text");
  figcaption.appendChild(checkbox);
  figcaption.appendChild(captionTxt);

  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h2 class='img__caption'>${destination.city}</h2>`
  );
  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h3 class='img__date'>${destination.country}</h3>`
  );

  //Events
  // move checked items to 'home' list
  checkbox.addEventListener("click", () => {
    toggleButtonHome(destination);
  });

  // delete an item
  deleteBtn.addEventListener("click", () => {
    deleteItem(destination);
  });

  //Append to wrapper (figure el)
  elDestination.appendChild(img);
  elDestination.appendChild(dropdown);
  elDestination.appendChild(deleteBtn);
  elDestination.appendChild(figcaption);

  // Return the destination HTML
  return elDestination;
}

function render() {
  gallery.textContent = "";
  // Create DOM elements for each destination
  storedList.forEach((destination) => {
    const elDestination = renderDestination(destination);
    gallery.appendChild(elDestination);
  });
}

function setActive() {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const current = event.target;

      if (activeBtn) {
        activeBtn.classList.remove("active-button");
        activeBtn.setAttribute("aria-pressed", false);
      }

      current.setAttribute("aria-pressed", true);
      current.classList.add("active-button");

      activeBtn = current;
    });
  });
  //set home as the default active button on page load
  document.querySelector(".btn__all").click();
}

function addClassHome() {
  gallery.classList.add("home");
  gallery.classList.remove("places");
}

function addClassPlaces() {
  gallery.classList.add("places");
  gallery.classList.remove("home");
}

function showAll() {
  gallery.classList.remove("home");
  gallery.classList.remove("places");
}

function openForm() {
  form.classList.add("form-state--open");
}

function closeForm() {
  form.classList.remove("form-state--open");
}

//shrink header on scroll
function shrinkNav() {
  navbar.classList.add("navbar--shrink");
}

// restore nav size on scroll up
function restoreNav() {
  const scrollPos = 0;
  if (document.body.getBoundingClientRect().top === scrollPos) {
    document.querySelector(".navbar").classList.remove("navbar--shrink");
  }
}

function init() {
  cacheDom();
  bindEvents();
}

const module = { init };
export default module;
