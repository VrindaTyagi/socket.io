//the most basic implementation of a gc room where a user posts a msg and anybody else on that same url can view the msg. The msg will broadcast to all the connected clients



//creating a server
const http = require('http').createServer();

//importing socket.io which takes our http object as an argument
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
//for security reasons, cross origin resource sharing is disabled and setting origin to * allowing any url to access our backend url

//just like websockets, socket.io is an event based system
//.on listens for a connection of a client from the frontend

io.on('connection', (socket) => {
  console.log('a user connected');

  //on the above socket, we can listen to any custom event we want
  //when a msg is emmited we might have access to the data which might be a js object oor a string which we can handle in the callback
  socket.on('message', (message) => {
    console.log(message);
    //re-emitting the msg so its broadcasted to everybody
    io.emit('message', `${socket.id.substr(0,2)} said ${message}`);
  });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );

