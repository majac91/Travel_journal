import { deleteItem, toggleButtonVisited } from "../store.js";
import events from "./pubsub.js";

// Create gallery elements and render them

//Variables
let buttons;
let visited;
let bucketlist;
let add;
let all;
let gallery;
let activeBtn;
let storedList;
let form;
let closeFormBtn;
let navbar;

function cacheDom() {
  buttons = Array.from(document.querySelector(".buttons").children);
  visited = buttons[1];
  bucketlist = buttons[2];
  all = buttons[3];
  add = buttons[4];
  navbar = document.querySelector(".navbar");
  gallery = document.querySelector(".gallery");
  activeBtn = null;
  form = document.getElementById("add-city-form");
  closeFormBtn = document.getElementById("close");
}

function bindEvents() {
  visited.addEventListener("click", addVisited);
  bucketlist.addEventListener("click", addBucketlist);
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
  elDestination.classList.add("gallery-img--container");

  // add the correct class to elDestination wrapper
  destination.visited === true
    ? elDestination.classList.add("visited")
    : elDestination.classList.add("bucketlist");

  // create img element
  const img = document.createElement("img");
  img.src = destination.photo;
  img.classList.add("gallery-img");

  //create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("gallery-checkbox");

  //check all visited list checkboxes
  if (destination.visited) {
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
  figcaption.classList.add("caption");
  //set captions in a div
  const captionTxt = document.createElement("div");
  captionTxt.classList.add("caption-text");
  figcaption.appendChild(checkbox);
  figcaption.appendChild(captionTxt);

  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h2 class='caption__city'>${destination.city}</h2>`
  );
  captionTxt.insertAdjacentHTML(
    "beforeend",
    `<h3 class='caption__country'>${destination.country}</h3>`
  );

  //Events
  // move checked items to 'visited' list
  checkbox.addEventListener("click", () => {
    toggleButtonVisited(destination);
    setTimeout(render, 1000);
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
  //set visited as the default active button on page load
  document.querySelector(".button__visited").click();
}

function addVisited() {
  gallery.classList.add("visited");
  gallery.classList.remove("bucketlist");
}

function addBucketlist() {
  gallery.classList.add("bucketlist");
  gallery.classList.remove("visited");
}

function showAll() {
  gallery.classList.remove("visited");
  gallery.classList.remove("bucketlist");
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
