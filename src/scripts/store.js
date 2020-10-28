import events from "./modules/pubsub";

const destinationsObj = {
  //Visited
  // rome123: {
  //   id: "rome123",
  //   city: "Rome",
  //   country: "Italy",
  //   photo: require("../img/rome.jpg"),
  //   visited: true,
  // },
  // milan123: {
  //   id: " milan123",
  //   city: "Milan",
  //   country: "Italy",
  //   photo: require("../img/milan.jpg"),
  //   visited: true,
  // },
  // venice123: {
  //   id: "venice123",
  //   city: "Venice",
  //   country: "Italy",
  //   photo: require("../img/venice.jpg"),
  //   visited: true,
  // },
  // padua123: {
  //   id: "padua123",
  //   city: "Padua",
  //   country: "Italy",
  //   photo: require("../img/padua.jpg"),
  //   visited: true,
  // },
  // verona123: {
  //   id: "verona123",
  //   city: "Verona",
  //   country: "Italy",
  //   photo: require("../img/verona.jpg"),
  //   visited: true,
  // },
  // florence123: {
  //   id: "florence123",
  //   city: "Florence",
  //   country: "Italy",
  //   photo: require("../img/florence.jpg"),
  //   visited: true,
  // },
  // bergamo123: {
  //   id: "bergamo123",
  //   city: "Bergamo",
  //   country: "Italy",
  //   photo: require("../img/bergamo.jpg"),
  //   visited: true,
  // },
  // barcelon123: {
  //   id: "barcelon123",
  //   city: "Barcelona",
  //   country: "Spain",
  //   photo: require("../img/barcelona.jpg"),
  //   visited: true,
  // },
  // lloret123: {
  //   id: "lloret123",
  //   city: "Lloret de mar",
  //   country: "Spain",
  //   photo: require("../img/lloretdemar.jpg"),
  //   visited: true,
  // },
  // nice123: {
  //   id: "nice123",
  //   city: "Nice",
  //   country: "France",
  //   photo: require("../img/nice.jpg"),
  //   visited: true,
  // },
  // cannes123: {
  //   id: "cannes123",
  //   city: "Cannes",
  //   country: "France",
  //   photo: require("../img/cannes.jpg"),
  //   visited: true,
  // },
  // stockholm123: {
  //   id: "stockholm123",
  //   city: "Stockholm",
  //   country: "Sweden",
  //   photo: require("../img/stockholm.jpg"),
  //   visited: true,
  // },
  // malmo123: {
  //   id: "malmo123",
  //   city: "Malmo",
  //   country: "Sweeden",
  //   photo: require("../img/malmo.jpg"),
  //   visited: true,
  // },
  // copenhagen123: {
  //   id: "copenhagen123",
  //   city: "Copenhagen",
  //   country: "Denmark",
  //   photo: require("../img/copenhagen.jpg"),
  //   visited: true,
  // },
  // vienna213: {
  //   id: "vienna213",
  //   city: "Vienna",
  //   country: "Austria",
  //   photo: require("../img/vienna.jpg"),
  //   visited: true,
  // },
  // monaco123: {
  //   id: "monaco123",
  //   city: "Monaco",
  //   country: "Monaco",
  //   photo: require("../img/monaco.jpg"),
  //   visited: true,
  // },
  // budapest123: {
  //   id: "budapest123",
  //   city: "Budapest",
  //   country: "Hungary",
  //   photo: require("../img/budapest.jpg"),
  //   visited: true,
  // },
  // padua123: {
  //   id: "padua123",
  //   city: "Prague",
  //   country: "Czech republic",
  //   photo: require("../img/prague.jpg"),
  //   visited: true,
  // },
  // belgrade123: {
  //   id: "belgrade123",
  //   city: "Belgrade",
  //   country: "Serbia",
  //   photo: require("../img/belgrade.jpg"),
  //   visited: true,
  // },
  // zlatibor123: {
  //   id: "zlatibor123",
  //   city: "Zlatibor",
  //   country: "Serbia",
  //   photo: require("../img/zlatibor.jpg"),
  //   visited: true,
  // },
  // kopaonik123: {
  //   id: "kopaonik123",
  //   city: "Kopaonik",
  //   country: "Serbia",
  //   photo: require("../img/kopaonik.jpg"),
  //   visited: true,
  // },
  // bratislava123: {
  //   id: "bratislava123",
  //   city: "Bratislava",
  //   country: "Slovakia",
  //   photo: require("../img/bratislava.jpg"),
  //   visited: true,
  // },
  // sofia123: {
  //   id: "sofia123",
  //   city: "Sofia",
  //   country: "Bulgaria",
  //   photo: require("../img/sofia.jpg"),
  //   visited: true,
  // },
  // bansko123: {
  //   id: "bansko123",
  //   city: "Bansko",
  //   country: "Slovakia",
  //   photo: require("../img/bansko1.jpg"),
  //   visited: true,
  // },
  // varna123: {
  //   id: "varna123",
  //   city: "Varna",
  //   country: "Bulgaria",
  //   photo: require("../img/varna.jpg"),
  //   visited: true,
  // },
  // solun123: {
  //   id: "solun123",
  //   city: "Thessaloniki",
  //   country: "Greece",
  //   photo: require("../img/thessaloniki.jpg"),
  //   visited: true,
  // },
  // istanbul123: {
  //   id: "istanbul123",
  //   city: "Istanbul",
  //   country: "Turkey",
  //   photo: require("../img/istanbul.jpg"),
  //   visited: true,
  // },
  // //Wishlist
  // paris123: {
  //   id: "paris123",
  //   city: "Paris",
  //   country: "France",
  //   photo: require("../img/paris.jpg"),
  //   visited: false,
  // },
  // santorini123: {
  //   id: "santorini123",
  //   city: "Santorini",
  //   country: "Greece",
  //   photo: require("../img/santorini.jpg"),
  //   visited: false,
  // },
  // newyork123: {
  //   id: "newyork123",
  //   city: "New York",
  //   country: "U.S.",
  //   photo: require("../img/newyork.jpg"),
  //   visited: false,
  // },
  // marrakech: {
  //   id: "marrakech",
  //   city: "Marrakech",
  //   country: "Morocco",
  //   photo: require("../img/marrakech.jpg"),
  //   visited: false,
  // },
  // amsterdam123: {
  //   id: "amsterdam123",
  //   city: "Amsterdam",
  //   country: "Netherlands",
  //   photo: require("../img/Amsterdam.png"),
  //   visited: false,
  // },
  // berlin123: {
  //   id: "berlin123",
  //   city: "Berlin",
  //   country: "Germany",
  //   photo: require("../img/berlin.jpg"),
  //   visited: false,
  // },
  // lisbon123: {
  //   id: "lisbon123",
  //   city: "Lisbon",
  //   country: "Porugal",
  //   photo: require("../img/lisbon.jpg"),
  //   visited: false,
  // },
  // tokyo123: {
  //   id: "tokyo123",
  //   city: "Tokyo",
  //   country: "Japan",
  //   photo: require("../img/tokyo.jpg"),
  //   visited: false,
  // },
  // sienna123: {
  //   id: "sienna123",
  //   city: "Sienna",
  //   country: "Italy",
  //   photo: require("../img/sienna.jpg"),
  //   visited: false,
  // },
  // dublin123: {
  //   id: "dublin123",
  //   city: "Dublin",
  //   country: "Ireland",
  //   photo: require("../img/dublin.jpg"),
  //   visited: false,
  // },
  // petersburg123: {
  //   id: "petersburg123",
  //   city: "Saint petersburg",
  //   country: "Russia",
  //   photo: require("../img/saintpetersburg.jpg"),
  //   visited: false,
  // },
};

export function toggleButtonVisited(item) {
  item.visited = true;

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

  const storedList = storedListLS ? JSON.parse(storedListLS) : {};

  // update the list with the new destination (formState).
  const newList = { ...storedList, [newItem.id]: newItem };

  localStorage.setItem("destinations", JSON.stringify(newList));

  events.publish("destinationUpdated", convertToArray(newList));
  return newList;
}

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
