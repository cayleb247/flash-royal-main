const socket = io();

function joinRoom(room) {
  socket.emit("room", input.value);
}

let token;

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
  socket.emit("login", token);
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

  socket.emit("login", token);
  callback(json);
}

login("test", "pas", () => {
  createQuestionSet(
    [{ question: "test", answer: "yes", pointValue: 10 }],
    "History",
    () => {}
  );
});

let roomStore = [];

function getRooms() {
  return roomStore;
}

socket.on("rooms", (rooms) => {
  roomStore = rooms;
});

let ready = 0;
let questionStore = [];

function readyInc() {
  ready++;
  if (ready > 0) {
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
});

socket.on("start", () => {
  console.log("here we go");
  socket.emit("answer", questionStore[0].answer);
});

socket.on("chooseQuestions", async () => {
  let questionSets = await getQuestionSets();
  console.log(questionSets);
  chooseSet(questionSets[0]._id);
});

async function getQuestionSets() {
  let response = await fetch("/api/questionSets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let json = await response.json();

  return json;
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

async function createRoom() {
  socket.emit("createRoom");
}

setTimeout(async () => {
  console.log(roomStore);
  if (!roomStore.length) {
    createRoom();
    return;
  } else {
    joinRoom(await getRooms()[0]);
  }
}, 100);
