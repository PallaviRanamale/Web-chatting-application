
const express = require('express');
<<<<<<< HEAD
const dotenv=require("dotenv");
// const { chats } = require('./data/data');
=======
const dotenv = require("dotenv");
const { chats } = require("./data/data");
>>>>>>> Coding11-12
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require("path");
const cors = require("cors");


dotenv.config();
connectDB();
const app = express();

app.use(express.json());   //to accept json data

app.get("/", (req, res) => {
    res.send("API running successfully");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

<<<<<<< HEAD
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


=======
>>>>>>> Coding11-12
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
// app.listen(5000, console.log(`Server Started on Port ${PORT}`.yellow.bold));

const server=app.listen(PORT, () => {                        
    console.log(`server is running on port ${PORT}` );
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log("User Joined Room: " + userData._id);
      socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
    socket.on("new message", (newMessageRecieved) => {
      console.log("Received message:", newMessageRecieved); // this is for debugging prady
      var chat = newMessageRecieved.chat;
      console.log("Received chat object:", chat);    // this is for debugging prady
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach(user => {
          if (user._id == newMessageRecieved.sender._id) return;
   
          socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  }); 
});

=======
const server = app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`.yellow.bold);
});

const io = require('socket.io')(server, {
     pingTimeout: 60000,
     cors: {
         origin: "http://localhost:3000",
     },
 });

 io.on('connection', (socket) => {
     console.log("Connected to socket.io");

     socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined Room :"+room);
        
    });

    socket.on('new message',(newMessageReceived)=>{
        var chat = newMessageReceived.chat;

        if(!chat.user) return console.log('chat.user not defined');

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.send._id) return;

            socket.in(user._id).emit("message recieved", newMessageReceived);
        });
    });
});

 
>>>>>>> Coding11-12

