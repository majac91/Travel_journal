import events from "./modules/pubsub";

const Parse = require("parse");
Parse.initialize(
  "vmgVvg3aF82Lhxcm97idm9UCLJGSHcvEzLmXxD22",
  "0ZzBp7Szs8vOyijUakZHud8WaxnT1taYtVKSJ6Ha"
);
Parse.serverURL = "https://parseapi.back4app.com/";

export function toggleButtonVisited(item) {
  // item.visited = true;
  const visited = item.visited;
  item.visited = !visited;

  const storedListLS = localStorage.getItem("destinations");

  const storedList = storedListLS ? JSON.parse(storedListLS) : {};

  const newList = { ...storedList, [item.id]: item };

  localStorage.setItem("destinations", JSON.stringify(newList));

  const updatedList = Object.keys(newList).map((id) => newList[id]);
  //publish the updated list item
  events.publish("destinationUpdated", convertToArray(updatedList));
}

//push new list item to destinationList
export function addDestination(newItem) {
  destinationsObj[newItem.id] = newItem;
  console.log(newItem);

  //Save new item to Local Storage
  const storedListLS = localStorage.getItem("destinations");
  console.log(storedListLS);

  const storedList = storedListLS ? JSON.parse(storedListLS) : {};
  console.log(storedList);

  // update the list with the new destination (formState).
  const newList = { ...storedList, [newItem.id]: newItem };
  console.log(newList);

  localStorage.setItem("destinations", JSON.stringify(newList));

  events.publish("destinationUpdated", convertToArray(newList));
  console.log(localStorage);
}

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
  const Destinations = Parse.Object.extend("Destinations");
  const query = new Parse.Query(Destinations);

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
    // console.log(object.get("photo"));

    let photo = object.get("photo").url();
    console.log(photo);

    let visitedObj = { city, country, visited, photo };
    visitedList.push(visitedObj);
  }
  console.log(visitedList);

  for (let i = 0; i < bucketlistQuery.length; i++) {
    let object = bucketlistQuery[i];
    let city = object.get("city");
    let country = object.get("country");
    let visited = object.get("visited");
    let url = object.get("photo");
    let bucketlistObj = { city, country, visited, url };
    bucketList.push(bucketlistObj);
  }

  console.log(bucketList);

  let retreivedList = [...visitedList, ...bucketList];
  console.log(retreivedList);
}

retreiveList();

function convertToArray(obj) {
  return Object.keys(obj).map((id) => {
    return obj[id];
  });
}

export function getStoredList() {
  const storedListLS = localStorage.getItem("destinations");

  const storedList = storedListLS ? JSON.parse(storedListLS) : [];
  return convertToArray(storedList);
}
