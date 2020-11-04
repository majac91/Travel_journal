import { getStoredList, toggleButtonVisited } from "../store.js";
import events from "./pubsub.js";

// Create  and display destination lists

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
  storedList = getStoredList();
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
  // events.subscribe("destinationUpdated", (newList) => {
  //   storedList = newList;
  //   render();
  // });
  events.subscribe("listRetreived", (list) => {
    console.log(list);
    storedList = list;
    render();
  });
}

function renderDestination(destination) {
  // create destination wrapper
  const elDestination = document.createElement("figure");
  elDestination.classList.add("gallery-img--container");

  // add the correct class to elDestination wrapper
  if (destination.visited === true) {
    elDestination.classList.add("visited");
  } else {
    elDestination.classList.add("bucketlist");
  }

  // create img element
  const img = document.createElement("img");
  img.src = destination.photo;
  img.classList.add("gallery-img");
  //create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check");

  // move checked items to 'visited' list

  checkbox.addEventListener("click", () => {
    toggleButtonVisited(destination);
  });

  //check all visited list checkboxes by default
  if (destination.visited) {
    checkbox.setAttribute("checked", "checked");
  }

  // add img to destination
  elDestination.appendChild(img);
  //add checkbox
  elDestination.appendChild(checkbox);

  //set img captions
  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("caption");
  figcaption.insertAdjacentHTML(
    "beforeend",
    `<h2 class='caption__city'>${destination.city}</h2>`
  );
  figcaption.insertAdjacentHTML(
    "beforeend",
    `<h3 class='caption__country'>${destination.country}</h3>`
  );
  // add captions to destination
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
  console.log("click");
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
  render();
}

const module = { init };
export default module;
