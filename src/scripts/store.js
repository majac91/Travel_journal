import events from "./modules/pubsub";

const Parse = require("parse");
Parse.initialize(
  "vmgVvg3aF82Lhxcm97idm9UCLJGSHcvEzLmXxD22",
  "0ZzBp7Szs8vOyijUakZHud8WaxnT1taYtVKSJ6Ha"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const Destinations = Parse.Object.extend("Destinations");
const destinations = new Destinations();
const query = new Parse.Query(Destinations);

// const destinationsArr = convertToArray(destinationsObj);

// destinationsArr.forEach((destination) => {
//   var Destinations = Parse.Object.extend("Destinations");
//   var destinations = new Destinations();
//   destinations.save({
//     city: destination.city,
//     country: destination.country,
//     visited: destination.visited,
//   });
// });

async function retreiveList() {
  query.equalTo("visited", true);
  const visitedQuery = await query.find();

  query.equalTo("visited", false);
  const bucketlistQuery = await query.find();

  let visitedList = [];
  let bucketList = [];

  for (let i = 0; i < visitedQuery.length; i++) {
    let object = visitedQuery[i];
    let city = object.get("city");
    let country = object.get("country");
    let visited = object.get("visited");
    let photo = object.get("photo").url();
    let visitedObj = { city, country, visited, photo };
    visitedList.push(visitedObj);
  }

  for (let i = 0; i < bucketlistQuery.length; i++) {
    let object = bucketlistQuery[i];
    let city = object.get("city");
    let country = object.get("country");
    let visited = object.get("visited");
    let photo = object.get("photo").url();
    let bucketListObj = { city, country, visited, photo };
    bucketList.push(bucketListObj);
  }

  let retreivedList = [...visitedList, ...bucketList];
  events.publish("listRetreived", retreivedList);
}

retreiveList();

export function addDestination(newItem) {
  const fileInput = document.getElementById("profilePhotoFileUpload");
  const selectedFiles = [...fileInput.files];
  const file = selectedFiles[0];
  const name = "photo.jpg";

  const parseFile = new Parse.File(name, file);

  destinations
    .save({
      city: newItem.city,
      country: newItem.country,
      visited: newItem.visited,
      photo: parseFile,
    })
    .then(function (response) {
      console.log("success");
    })
    .catch(function (error) {
      console.log("error");
    });
}

function convertToArray(obj) {
  return Object.keys(obj).map((id) => {
    return obj[id];
  });
}

export function toggleButtonVisited(item) {
  // item.visited = true;
  const visited = item.visited;
  item.visited = !visited;
  console.log(destinations);

  // query.equalTo("city", item.city);
  destinations.set("visited", item.visited);
  // query.equalTo("city", item.city);
  // console.log(item.visited);
}
