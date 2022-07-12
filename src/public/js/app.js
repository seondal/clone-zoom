const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from server");
});

function handleSubmit(e) {
  e.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
