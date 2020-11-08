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

  const destList = [...visitedQuery, ...bucketlistQuery];

  const retreivedList = [];

  for (let i = 0; i < destList.length; i++) {
    let object = destList[i];
    let city = object.get("city");
    let country = object.get("country");
    let visited = object.get("visited");
    let photo = object.get("photo").url();
    let listItem = { city, country, visited, photo };
    retreivedList.push(listItem);
  }

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

export async function toggleButtonVisited(item) {
  const visited = item.visited;
  item.visited = !visited;

  const query = new Parse.Query(Destinations);
  query.equalTo("city", item.city);
  const updateQuery = await query.find();

  updateQuery[0].set("visited", item.visited).save();
}

export async function deleteItem(item) {
  const query = new Parse.Query(Destinations);
  query.equalTo("city", item.city);
  const deleteQuery = await query.find();

  deleteQuery[0].destroy().then(
    (myObject) => {
      console.log("The object was deleted successfully.");
    },
    (error) => {
      console.log(error);
    }
  );
}
