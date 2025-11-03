# Complete Backend Guide - NEAR CHAT Application

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Backend Architecture](#backend-architecture)
4. [Key Node.js & Express Concepts](#key-nodejs--express-concepts)
5. [Database & Mongoose Explained](#database--mongoose-explained)
6. [API Structure Breakdown](#api-structure-breakdown)
7. [Authentication & Security](#authentication--security)
8. [Socket.io Real-time Communication](#socketio-real-time-communication)
9. [Important Concepts for Interview](#important-concepts-for-interview)
10. [Common Interview Questions & Answers](#common-interview-questions--answers)
11. [Code Examples You Should Know](#code-examples-you-should-know)

---

## 🎯 Project Overview

**Backend Architecture:** RESTful API built with Node.js and Express.js that handles:
- User registration and authentication
- Chat management (one-on-one and group chats)
- Message storage and retrieval
- Real-time message broadcasting via Socket.io
- Database operations with MongoDB/Mongoose

### Backend Responsibilities:
1. **User Management**: Register, login, search users
2. **Chat Management**: Create chats, fetch user chats, manage groups
3. **Message Management**: Send messages, fetch chat messages
4. **Real-time Communication**: Broadcast messages using Socket.io
5. **Security**: JWT authentication, password hashing

---

## 🛠 Technology Stack

### Core Technologies:
1. **Node.js** - JavaScript runtime for server-side development
2. **Express.js 4.18.3** - Web framework for building APIs
3. **MongoDB** - NoSQL database for storing data
4. **Mongoose 8.2.4** - MongoDB object modeling (ODM)
5. **Socket.io 4.7.5** - Real-time bidirectional communication
6. **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
7. **bcryptjs 2.4.3** - Password hashing

### Why These Technologies?
- **Express**: Minimal, flexible, lots of middleware
- **MongoDB**: Document-based, flexible schema, good for chat apps
- **Mongoose**: Makes MongoDB easier, provides schemas and validation
- **Socket.io**: WebSocket library for real-time features
- **JWT**: Stateless authentication (no server-side sessions needed)
- **bcryptjs**: Secure password hashing (one-way encryption)

---

## 🏗 Backend Architecture

### Project Structure
```
backend/
├── server.js              # Main entry point, Express app setup
├── config/
│   ├── db.js              # MongoDB connection
│   └── generateToken.js  # JWT token generation
├── Models/                # Database schemas
│   ├── userModel.js       # User schema
│   ├── chatModel.js       # Chat schema
│   └── messageModel.js    # Message schema
├── routes/                # API route definitions
│   ├── userRoutes.js      # User endpoints
│   ├── chatRoutes.js      # Chat endpoints
│   └── messageRoutes.js   # Message endpoints
├── controllers/           # Business logic
│   ├── userControllers.js
│   ├── chatControllers.js
│   └── messageController.js
└── middleware/
    ├── authMiddleware.js  # JWT authentication
    └── errorMiddleware.js # Error handling
```

### Architecture Pattern: MVC (Model-View-Controller)
- **Models**: Database schemas (Mongoose models)
- **Views**: JSON responses (no HTML, this is an API)
- **Controllers**: Business logic that handles requests

---

## 💡 Key Node.js & Express Concepts

### 1. **What is Node.js?**
Node.js lets you run JavaScript on the server (not just in the browser).

**Key Features:**
- Single-threaded, event-driven
- Non-blocking I/O (asynchronous operations)
- Perfect for APIs and real-time applications

### 2. **Express.js Basics**

Express is a minimal web framework. Think of it as a toolkit for building APIs.

#### Basic Express Server
```javascript
const express = require('express');
const app = express();

// Middleware - runs before routes
app.use(express.json()); // Parse JSON bodies

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Key Concepts:**
- **req (request)**: Incoming HTTP request (data from client)
- **res (response)**: Outgoing HTTP response (data to send back)
- **Middleware**: Functions that run between request and response
- **Routes**: Define endpoints (URLs) and what to do when accessed

### 3. **HTTP Methods**
- **GET**: Retrieve data (read-only)
- **POST**: Create new resource
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

### 4. **Request/Response Cycle**
```
Client Request → Express Middleware → Route Handler → Controller → Database
                                                                    ↓
Client Response ← Express Middleware ← Route Handler ← Controller ← Database Response
```

---

## 🗄 Database & Mongoose Explained

### MongoDB Basics
MongoDB is a **NoSQL** database:
- Stores data as **documents** (like JSON objects)
- No fixed schema (flexible structure)
- Collections = tables (in SQL)
- Documents = rows (in SQL)

### Mongoose ODM
Mongoose makes MongoDB easier by providing:
- **Schemas**: Define structure of documents
- **Models**: Use schemas to interact with database
- **Methods**: Add custom functions to models
- **Validation**: Automatic data validation

### Schema Example (from your project)
```javascript
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: { type: String, default: "default.jpg" }
}, { timestamps: true });
```

**Key Points:**
- `type`: Data type (String, Number, Boolean, Date, ObjectId)
- `required`: Field must be provided
- `unique`: No duplicate values allowed
- `default`: Value if not provided
- `timestamps: true`: Adds `createdAt` and `updatedAt` automatically

### Mongoose Methods
```javascript
// Create
await User.create({ name: 'John', email: 'john@example.com' });

// Find one
const user = await User.findOne({ email: 'john@example.com' });

// Find all
const users = await User.find({ active: true });

// Update
await User.findByIdAndUpdate(id, { name: 'New Name' }, { new: true });

// Delete
await User.findByIdAndDelete(id);
```

### Populate (Joining Collections)
```javascript
// Instead of just storing ObjectId, populate fetches the full document
const chat = await Chat.findOne().populate('users', '-password');
// This fetches full user objects, excluding password field
```

---

## 🔌 API Structure Breakdown

### API Endpoints Overview

#### User Routes (`/api/user`)
- `POST /api/user` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user?search=keyword` - Search users

#### Chat Routes (`/api/chat`)
- `POST /api/chat` - Create or access one-on-one chat
- `GET /api/chat` - Get all chats for logged-in user
- `POST /api/chat/group` - Create group chat
- `PUT /api/chat/rename` - Rename group chat
- `PUT /api/chat/groupadd` - Add user to group
- `PUT /api/chat/groupremove` - Remove user from group

#### Message Routes (`/api/message`)
- `POST /api/message` - Send a message
- `GET /api/message/:chatId` - Get all messages in a chat

### How Routes Work

#### 1. Route Definition (`routes/userRoutes.js`)
```javascript
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

module.exports = router;
```

**Explanation:**
- `router.route('/')` - Defines base route
- `.post()` - Handles POST requests
- `.get()` - Handles GET requests
- `protect` - Middleware that checks authentication
- Middleware order matters: `protect` runs before `allUsers`

#### 2. Controller Functions (`controllers/userControllers.js`)
```javascript
const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password, pic} = req.body;
  
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  
  // Check if user exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  // Create user
  const user = await User.create({ name, email, password, pic });
  
  // Send response with token
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: generateToken(user._id),
  });
});
```

**Key Concepts:**
- `req.body` - Contains data sent in request body
- `req.params` - URL parameters (e.g., `/api/message/:chatId`)
- `req.query` - Query string (e.g., `?search=john`)
- `res.status()` - Set HTTP status code
- `res.json()` - Send JSON response
- `asyncHandler` - Wraps async functions to catch errors

---

## 🔐 Authentication & Security

### JWT (JSON Web Tokens)

**What is JWT?**
A token that proves user is authenticated. Contains user info (like user ID).

**Structure:**
```
header.payload.signature
```

### How Authentication Works:

#### 1. **User Registration/Login**
```javascript
// User logs in with email/password
const user = await User.findOne({ email });
if (user && await user.matchPassword(password)) {
  // Generate token
  const token = generateToken(user._id);
  res.json({ user, token });
}
```

#### 2. **Token Generation** (`config/generateToken.js`)
```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",  // Token valid for 30 days
  });
};
```

#### 3. **Token Verification** (`middleware/authMiddleware.js`)
```javascript
const protect = asyncHandler(async (req, res, next) => {
  // Extract token from header
  // Authorization: Bearer <token>
  const token = req.headers.authorization.split(" ")[1];
  
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Get user from database (exclude password)
  req.user = await User.findById(decoded.id).select("-password");
  
  next(); // Continue to next middleware/route
});
```

**Flow:**
1. User logs in → Receives token
2. User makes request → Sends token in Authorization header
3. `protect` middleware → Verifies token, adds user to `req.user`
4. Controller → Can access `req.user` to know who is making request

### Password Hashing (bcrypt)

**Why hash passwords?**
Never store passwords in plain text! Hash them so even if database is hacked, passwords aren't readable.

#### Password Hashing in User Model
```javascript
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next(); // Skip if password not changed
  }
  
  // Generate salt and hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

**How it works:**
- **Salt**: Random string added to password before hashing
- **Hash**: One-way encryption (can't reverse)
- **Compare**: Compare entered password with stored hash

---

## 🔌 Socket.io Real-time Communication

### What is Socket.io?
Library that enables real-time, bidirectional communication between client and server using WebSockets.

### How It Works in Your Project

#### Server Setup (`server.js`)
```javascript
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" }
});

io.on('connection', (socket) => {
  console.log("Connected to socket.io");
  
  // User joins their personal room
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });
  
  // User joins a chat room
  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  
  // Broadcast new message to all users in chat
  socket.on('new message', (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    
    // Send to all users in chat except sender
    chat.users.forEach(user => {
      if (user._id != newMessageReceived.sender._id) {
        socket.in(user._id).emit("message received", newMessageReceived);
      }
    });
  });
});
```

**Key Concepts:**
- **Connection**: When client connects, server receives `connection` event
- **Rooms**: Virtual spaces users can join (`socket.join(roomId)`)
- **Emit**: Send event to client (`socket.emit()` or `io.emit()`)
- **On**: Listen for events from client (`socket.on()`)
- **Broadcast**: Send to all clients except sender

**Flow:**
1. User A sends message → Frontend saves to DB via API
2. Frontend emits `new message` event → Server receives
3. Server broadcasts → All users in that chat room receive
4. Other users' frontend → Updates UI with new message

---

## 📝 Component Breakdown

### 1. **server.js** - Application Entry Point
```javascript
const express = require('express');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

// Socket.io setup
const io = require('socket.io')(server, {...});
```

**Key Responsibilities:**
- Initialize Express app
- Connect to database
- Register routes
- Setup Socket.io
- Handle errors globally

### 2. **User Controllers**

#### `registerUser` - User Registration
```javascript
const registerUser = asyncHandler(async(req, res) => {
  const {name, email, password, pic} = req.body;
  
  // 1. Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  
  // 2. Check if user already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  // 3. Create user (password automatically hashed by pre-save hook)
  const user = await User.create({ name, email, password, pic });
  
  // 4. Return user data with token
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: generateToken(user._id),
  });
});
```

**Interview Points:**
- Always validate input before processing
- Check for duplicates before creating
- Password hashing happens automatically (pre-save hook)
- Return token so user is immediately authenticated
- Use proper HTTP status codes (201 for created)

#### `authUser` - User Login
```javascript
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  
  // 1. Find user by email
  const user = await User.findOne({email});
  
  // 2. Verify password using model method
  if (user && (await user.matchPassword(password))) {
    // 3. Return user data with token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
```

**Interview Points:**
- Use `matchPassword` method (bcrypt comparison)
- Return same format as registration
- 401 status for authentication failures

#### `allUsers` - Search Users
```javascript
const allUsers = asyncHandler(async(req, res) => {
  // Build search query
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  } : {};
  
  // Find users (exclude current user)
  const users = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } });
  
  res.send(users);
});
```

**Interview Points:**
- Use MongoDB regex for case-insensitive search
- `$or` operator searches multiple fields
- Exclude current user from results
- `protect` middleware ensures `req.user` exists

### 3. **Chat Controllers**

#### `accessChat` - Create/Get One-on-One Chat
```javascript
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  
  // 1. Check if chat already exists between these users
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  
  // 2. If chat exists, return it
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // 3. Create new chat
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password");
    
    res.status(200).json(FullChat);
  }
});
```

**Interview Points:**
- Check if chat exists before creating (avoid duplicates)
- `$elemMatch` finds documents where array contains specific value
- Populate to get full user objects instead of just IDs

#### `fetchChats` - Get All User's Chats
```javascript
const fetchChats = asyncHandler(async (req, res) => {
  Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })  // Most recent first
    .then(async (results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      res.status(200).send(results);
    });
});
```

**Interview Points:**
- Sort by `updatedAt: -1` (descending) to show recent chats first
- Multiple populate calls to get nested data
- Chaining `.then()` for nested population

#### `createGroupChat` - Create Group
```javascript
const createGroupChat = asyncHandler(async (req, res) => {
  // 1. Validate input
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }
  
  var users = JSON.parse(req.body.users);
  
  // 2. Check minimum users (need at least 2 + creator = 3)
  if (users.length < 2) {
    return res.status(400).send("More than 2 users required");
  }
  
  // 3. Add creator to users array
  users.push(req.user);
  
  // 4. Create group chat
  const groupChat = await Chat.create({
    chatName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user,
  });
  
  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  
  res.status(200).json(fullGroupChat);
});
```

### 4. **Message Controllers**

#### `sendMessage` - Send Message
```javascript
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  
  // 1. Validate
  if (!content || !chatId) {
    return res.sendStatus(400);
  }
  
  // 2. Create message
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  
  var message = await Message.create(newMessage);
  
  // 3. Populate sender and chat
  message = await message.populate("sender", "name pic").execPopulate();
  message = await message.populate("chat").execPopulate();
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });
  
  // 4. Update chat's latestMessage
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
  res.json(message);
});
```

**Interview Points:**
- Populate multiple levels (sender, chat, chat.users)
- Update parent chat's latestMessage field
- Return fully populated message object

#### `allMessages` - Get Chat Messages
```javascript
const allMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name pic email")
    .populate("chat");
  
  res.json(messages);
});
```

---

## 🛡 Error Handling

### Error Middleware (`middleware/errorMiddleware.js`)
```javascript
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass to next error handler
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
```

**How it works:**
- `notFound`: Catches 404 errors (route not found)
- `errorHandler`: Centralized error handling
- Stack trace only in development (security)

### asyncHandler
Wraps async functions to automatically catch errors:
```javascript
const asyncHandler = require("express-async-handler");

// Instead of try/catch everywhere:
const handler = asyncHandler(async (req, res) => {
  // Any error here is automatically caught and passed to errorHandler
  throw new Error("Something went wrong");
});
```

---

## 💬 Common Interview Questions & Answers

### Q1: "Explain your backend architecture"
**Answer:**
"I built a RESTful API using Node.js and Express.js. The architecture follows MVC pattern: Models define database schemas using Mongoose, Controllers contain business logic, and Routes define API endpoints. I used MongoDB for data storage due to its flexibility with nested documents. Authentication is handled with JWT tokens, and real-time messaging uses Socket.io for WebSocket connections."

### Q2: "Why did you choose MongoDB over SQL?"
**Answer:**
"For a chat application, MongoDB's document-based structure fits well. Chat data with nested arrays of users and messages maps naturally to documents. The schema flexibility allows easy addition of features. Mongoose provides validation and relationships similar to SQL ORMs."

### Q3: "How does JWT authentication work?"
**Answer:**
"When a user logs in, I generate a JWT token containing the user ID, signed with a secret key. The client stores this token and sends it in the Authorization header for subsequent requests. My `protect` middleware verifies the token, extracts the user ID, fetches the user from database, and attaches it to `req.user`. This allows controllers to know which user is making the request without storing sessions on the server."

### Q4: "How do you secure passwords?"
**Answer:**
"I use bcryptjs to hash passwords. Before saving a user, a pre-save hook generates a salt and hashes the password using bcrypt. The original password is never stored. When logging in, I use the `matchPassword` method that uses bcrypt.compare to verify the entered password against the stored hash."

### Q5: "Explain Socket.io implementation"
**Answer:**
"Socket.io enables real-time communication. When a user sends a message, the frontend saves it via REST API, then emits a 'new message' event to the server. The server receives this event, finds all users in that chat room, and broadcasts the message to each user (except the sender). Each user's frontend listens for 'message received' events and updates the UI. Users join rooms based on chat ID, so messages are only sent to relevant users."

### Q6: "What is middleware and how do you use it?"
**Answer:**
"Middleware are functions that run between request and response. I use several: `express.json()` to parse JSON bodies, `protect` to verify JWT tokens, and error handlers. Middleware can modify req/res, call next() to continue, or send a response to stop the chain. For example, `protect` checks authentication and attaches user to req.user before allowing access to protected routes."

### Q7: "How do you handle errors?"
**Answer:**
"I use `asyncHandler` to wrap async controllers, automatically catching errors and passing them to error middleware. I have two error handlers: `notFound` for 404s and `errorHandler` for all errors. The error handler sets appropriate status codes and returns error messages. In production, stack traces are hidden for security."

### Q8: "What is Mongoose populate?"
**Answer:**
"Populate is like a JOIN in SQL. When a schema references another model via ObjectId, populate replaces the ID with the actual document. For example, when fetching a chat, users are stored as ObjectIds. Using `.populate('users')` replaces those IDs with full user objects, excluding sensitive fields like passwords."

### Q9: "Explain the chat creation logic"
**Answer:**
"Before creating a one-on-one chat, I check if a chat already exists between the two users using `$elemMatch` to find chats where both user IDs are in the users array. If found, I return the existing chat to avoid duplicates. If not, I create a new chat with both users. For group chats, I validate minimum user count, add the creator to the users array, and set them as groupAdmin."

### Q10: "How do you search users?"
**Answer:**
"I use MongoDB's `$regex` operator for case-insensitive text search. The search looks in both name and email fields using `$or`. The regex option 'i' makes it case-insensitive. I exclude the current user from results using `$ne` (not equal) operator."

---

## 📝 Code Examples You Should Know

### 1. Basic Express Server
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### 2. Mongoose Schema
```javascript
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
```

### 3. Controller Function
```javascript
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### 4. Authentication Middleware
```javascript
const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};
```

### 5. Password Hashing
```javascript
const bcrypt = require('bcryptjs');

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Compare password
const isMatch = await bcrypt.compare(enteredPassword, user.password);
```

### 6. JWT Token
```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '30d'
});

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 7. MongoDB Queries
```javascript
// Find one
const user = await User.findOne({ email: 'test@example.com' });

// Find all with conditions
const activeUsers = await User.find({ active: true });

// Find by ID
const user = await User.findById(userId);

// Update
await User.findByIdAndUpdate(userId, { name: 'New Name' }, { new: true });

// Delete
await User.findByIdAndDelete(userId);

// Search with regex
const users = await User.find({
  name: { $regex: searchTerm, $options: 'i' }
});
```

### 8. Mongoose Populate
```javascript
const chat = await Chat.findOne()
  .populate('users', '-password')  // Exclude password
  .populate('latestMessage')
  .populate('groupAdmin', 'name email');
```

### 9. Socket.io Setup
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
  });
  
  socket.on('send message', (data) => {
    io.to(data.roomId).emit('new message', data);
  });
});
```

### 10. Error Handling
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
const handler = asyncHandler(async (req, res) => {
  throw new Error('Something went wrong');
});
```

---

## 🚀 Tips for Interview Success

1. **Explain the Flow**: Walk through how a request goes from client to database and back
2. **Security Focus**: Emphasize password hashing, JWT, input validation
3. **Real-time Features**: Be able to explain Socket.io implementation
4. **Database Design**: Explain why you chose MongoDB schema structure
5. **Error Handling**: Show understanding of async error handling
6. **REST Principles**: Explain your API design choices

---

## ✅ Final Checklist

- [ ] I can explain Node.js and Express basics
- [ ] I understand MongoDB and Mongoose
- [ ] I can explain JWT authentication flow
- [ ] I understand password hashing with bcrypt
- [ ] I can explain Socket.io real-time communication
- [ ] I understand middleware concept
- [ ] I know how to write CRUD operations
- [ ] I understand Mongoose populate
- [ ] I can explain error handling
- [ ] I understand REST API design

---

**Good luck with your interview! You've got this! 🎉**
