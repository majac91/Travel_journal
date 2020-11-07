import { addDestination } from "../store.js";
let form;
let radioBtns;
let radioVisited;
let radioBucketlist;
let cityInput;
let countryInput;
let photoInput;
let fileInput;
let formState = {
  city: null,
  country: null,
  photo: null,
};

function cacheDom() {
  form = document.getElementById("add-city-form");
  radioBtns = document.querySelectorAll("input[type=radio]");
  radioVisited = document.getElementById("rd-visited");
  radioBucketlist = document.getElementById("rd-bucketlist");
  cityInput = document.getElementById("inputCity");
  countryInput = document.getElementById("inputCountry");
  photoInput = document.getElementById("inputImg");
  fileInput = document.getElementById("profilePhotoFileUpload");
}

function bindEvents() {
  form.addEventListener("submit", (event) => {
    formState.id = Math.round(Math.random() * 100000);
    addDestination(formState);
    event.preventDefault();
    form.reset();
  });
  radioVisited.addEventListener("click", isVisited);
  radioBucketlist.addEventListener("click", isBucketlist);
  cityInput.addEventListener("change", (event) => {
    updateFormState("city", capitalize(event.target.value));
  });
  countryInput.addEventListener("change", (event) => {
    updateFormState("country", event.target.value);
  });
}

//update the formState values for city, country and photo on 'change' event
function updateFormState(fieldName, value) {
  formState[fieldName] = value;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function isVisited() {
  updateFormState("visited", true);
}

function isBucketlist() {
  updateFormState("visited", false);
}

function initRadioBtn() {
  radioBtns.forEach((button) => {
    isVisited();
    isBucketlist();
  });
}

function init() {
  cacheDom();
  bindEvents();
  initRadioBtn();
}

const module = { init };
export default module;
// export { form };
