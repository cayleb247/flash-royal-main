const socket = io();

function joinRoom(room, callback) {
  socket.emit("room", room);
  callback();
}
let token;

let onRoomsCallback;

function setOnRoomsCallback(callback) {
  onRoomsCallback = callback;
}

if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
  socket.emit("login", token);
}

async function signup(username, password, callback) {
  let response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  let json = await response.json();
  token = json.token;
  localStorage.setItem("token", token);
  callback(json);
}

async function login(username, password, callback) {
  let response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  let json = await response.json();
  token = json.token;
  localStorage.setItem("token", token);
  socket.emit("login", token);
  callback(json);
}

let roomStore = [];

function getRooms() {
  return roomStore;
}

socket.on("rooms", (rooms) => {
  roomStore = rooms;
  if (onRoomsCallback) onRoomsCallback();
});

let ready = 0;
let questionStore = [];

function readyInc() {
  ready++;
  if (ready > 1) {
    socket.emit("start");
    console.log("stert");
  }
}

socket.on("correct", () => {
  console.log("correct");
});

socket.on("incorrect", () => {
  console.log("incorrect");
});

socket.on("questions", (questions) => {
  console.log(questions);
  readyInc();
  questionStore.push(...questions);
  localStorage.setItem("questions", JSON.stringify(questionStore));
});

let onStartCallback;

function setOnStartCallback(callback) {
  onStartCallback = callback;
}

socket.on("start", () => {
  // console.log("here we go");
  // socket.emit("answer", questionStore[0].answer);
  localStorage.setItem("questions", JSON.stringify(questionStore));
  onStartCallback();
});

socket.on("chooseQuestions", async () => {
  let questionSets = await getQuestionSets();
  // console.log(questionSets);
  // chooseSet(questionSets[0]._id);
});

async function getQuestionSets() {
  if (token) {
    let response = await fetch("/api/questionSets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let json = await response.json();

    return json;
  } else {
    setTimeout(() => getQuestionSets(), 100);
  }
}

async function createQuestionSet(questions, name, callback) {
  let response = await fetch("/api/createQuestionSet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ questions, name }),
  });

  let text = await response.text();

  callback(text);
}

async function chooseSet(id) {
  socket.emit("chooseSet", id);
}

async function createRoom(callback) {
  socket.emit("createRoom");
  callback();
}
