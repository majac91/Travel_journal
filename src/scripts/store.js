import events from "./modules/pubsub";
import { mscConfirm } from "medium-style-confirm";
import Parse from "parse";
import "medium-style-confirm/css/msc-style.css";

Parse.initialize(
  "vmgVvg3aF82Lhxcm97idm9UCLJGSHcvEzLmXxD22",
  "0ZzBp7Szs8vOyijUakZHud8WaxnT1taYtVKSJ6Ha"
);
Parse.serverURL = "https://parseapi.back4app.com/";

const Destinations = Parse.Object.extend("Destinations");
const destinations = new Destinations();
const query = new Parse.Query(Destinations);

//get a list from server and publish
export async function retreiveList() {
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
  return retreivedList;
}

retreiveList();

//add new city
export async function addDestination(newItem) {
  //create the file and upload to server
  const fileInput = document.getElementById("inputImg");
  const selectedFiles = [...fileInput.files];
  const file = selectedFiles[0];
  const name = "photo.jpg";
  const parseFile = new Parse.File(name, file);

  //save new city
  try {
    await destinations.save({
      city: newItem.city,
      country: newItem.country,
      visited: newItem.visited,
      photo: parseFile,
    });
    console.log("The object was added successfully.");
    retreiveList();
  } catch (error) {
    console.log(error);
  }
}

//check/uncheck an item from a list
export async function toggleButtonVisited(item) {
  const visited = item.visited;
  item.visited = !visited;

  const query = new Parse.Query(Destinations);
  query.equalTo("city", item.city);
  const updateQuery = await query.find();

  try {
    const object = await updateQuery[0].set("visited", item.visited).save();
    console.log("The object was updated successfully.");
  } catch (error) {
    console.log(error);
  }
}

//delete an item
export async function deleteItem(item) {
  const query = new Parse.Query(Destinations);
  query.equalTo("city", item.city);
  const deleteQuery = await query.find();

  if (
    mscConfirm("Delete destination?", async function () {
      try {
        const object = await deleteQuery[0].destroy();
        console.log("The object was deleted successfully.");
      } catch (e) {
        console.log("Delete failed!", error);
      }
      retreiveList();
    })
  );
}
