// the io object will now be globally available in the browser which is the socket.io client library
// we can create the connection by pointing to the url of our server
const socket = io("ws://localhost:8080");

//now we're ready to listen to events
//by calling socket.on, we can listen to the msg event emiited by our server
socket.on("message", (text) => {
  const el = document.createElement("li");
  el.innerHTML = text;
  document.querySelector("ul").appendChild(el);
});

//giving the user the ability to send a msg
document.querySelector("button").onclick = () => {
  const text = document.querySelector("input").value;
  socket.emit("message", text);
};
