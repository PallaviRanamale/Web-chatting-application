# 🎯 Backend Interview Code Examples - Practice These!

These are common backend code snippets you might be asked to write in an interview.

---

## 1. Basic Express Server Setup

### Complete Server with Routes
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Key Points:**
- `express.json()` middleware is essential for parsing JSON
- Environment variable for port allows flexibility
- Always send JSON responses in APIs

---

## 2. Mongoose Schema Definition

### User Schema with Validation
```javascript
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

**Key Points:**
- `required` with custom message
- `unique` prevents duplicates
- `enum` restricts values to specific options
- `timestamps` automatically tracks creation/update times

---

## 3. MongoDB Connection

### Database Connection with Error Handling
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
```

**Key Points:**
- Always use try-catch for async operations
- Exit process on connection failure
- Use environment variables for connection string

---

## 4. CRUD Operations

### Complete CRUD Controller
```javascript
const User = require('../models/userModel');

// CREATE - Register user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
```

---

## 5. Authentication Middleware (JWT)

### Complete Auth Middleware
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  
  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      // Format: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      next(); // Continue to next middleware
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
```

**Key Points:**
- Extract token from "Bearer <token>" format
- Verify token with secret
- Attach user to `req.user` for use in controllers
- Call `next()` to continue middleware chain

---

## 6. Password Hashing with bcrypt

### Password Hashing in Schema
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  
  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
```

### Login Controller Using Password Comparison
```javascript
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## 7. JWT Token Generation

### Token Generation Function
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

module.exports = generateToken;
```

### Using Token in Controllers
```javascript
const generateToken = require('../config/generateToken');

const registerUser = async (req, res) => {
  // ... create user code ...
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // Include token in response
    });
  }
};
```

---

## 8. Express Routes Setup

### Route Definition Pattern
```javascript
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createUser); // Register
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/', protect, getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
```

### Using Routes in server.js
```javascript
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);
// Now routes are:
// POST /api/users - Register
// GET /api/users - Get all users (protected)
// etc.
```

---

## 9. MongoDB Query Examples

### Basic Queries
```javascript
// Find all
const users = await User.find();

// Find one
const user = await User.findOne({ email: 'test@example.com' });

// Find by ID
const user = await User.findById(userId);

// Find with conditions
const activeUsers = await User.find({ active: true });

// Find and exclude current user
const otherUsers = await User.find({ _id: { $ne: req.user._id } });

// Limit results
const users = await User.find().limit(10);

// Sort
const users = await User.find().sort({ createdAt: -1 }); // Newest first

// Select specific fields
const users = await User.find().select('name email -password');
```

### Advanced Queries
```javascript
// Search with regex (case-insensitive)
const users = await User.find({
  $or: [
    { name: { $regex: searchTerm, $options: 'i' } },
    { email: { $regex: searchTerm, $options: 'i' } },
  ],
});

// Find documents where array contains value
const chats = await Chat.find({
  users: { $elemMatch: { $eq: userId } }
});

// Update array (add to array)
await Chat.findByIdAndUpdate(
  chatId,
  { $push: { users: userId } },
  { new: true }
);

// Update array (remove from array)
await Chat.findByIdAndUpdate(
  chatId,
  { $pull: { users: userId } },
  { new: true }
);
```

---

## 10. Mongoose Populate

### Simple Populate
```javascript
// Populate single field
const chat = await Chat.findById(chatId)
  .populate('users', '-password'); // Exclude password field

// Populate multiple fields
const chat = await Chat.findById(chatId)
  .populate('users', '-password')
  .populate('groupAdmin', 'name email')
  .populate('latestMessage');
```

### Nested Populate
```javascript
// Populate nested fields
const message = await Message.findById(messageId)
  .populate('sender', 'name pic')
  .populate({
    path: 'chat',
    populate: {
      path: 'users',
      select: 'name email',
    },
  });

// Or using populate multiple times
let chat = await Chat.findById(chatId).populate('users');
chat = await User.populate(chat, {
  path: 'latestMessage.sender',
  select: 'name pic email',
});
```

---

## 11. Error Handling Middleware

### Custom Error Handler
```javascript
// middleware/errorMiddleware.js
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
```

### Using in server.js
```javascript
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
app.use('/api/users', userRoutes);

// Error handlers (must be after routes)
app.use(notFound);
app.use(errorHandler);
```

### asyncHandler Utility
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
  // Any error is automatically caught and passed to errorHandler
});
```

---

## 12. Socket.io Implementation

### Server Setup
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // User joins their personal room
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');
  });
  
  // Join chat room
  socket.on('join chat', (roomId) => {
    socket.join(roomId);
    console.log('User joined room:', roomId);
  });
  
  // Send message
  socket.on('new message', (messageData) => {
    const chat = messageData.chat;
    
    // Broadcast to all users in chat except sender
    chat.users.forEach((user) => {
      if (user._id !== messageData.sender._id) {
        socket.to(user._id).emit('message received', messageData);
      }
    });
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

---

## 13. Search Functionality

### User Search with Multiple Fields
```javascript
const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    
    // Build search query
    const keyword = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};
    
    // Find users (exclude current user)
    const users = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## 14. Group Chat Management

### Create Group Chat
```javascript
const createGroupChat = async (req, res) => {
  try {
    const { name, users } = req.body;
    
    // Validation
    if (!name || !users) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    
    // Parse users if string
    const usersArray = typeof users === 'string' 
      ? JSON.parse(users) 
      : users;
    
    // Minimum 2 users required (plus creator = 3 total)
    if (usersArray.length < 2) {
      return res.status(400).json({ 
        message: 'At least 2 users required' 
      });
    }
    
    // Add creator to users
    usersArray.push(req.user._id);
    
    // Create group
    const groupChat = await Chat.create({
      chatName: name,
      users: usersArray,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });
    
    // Populate and return
    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    
    res.status(201).json(fullGroupChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Update Group (Add/Remove Users)
```javascript
// Add user to group
const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove user from group
const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate('users', '-password')
      .populate('groupAdmin', '-password');
    
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## 15. Message Handling

### Send Message
```javascript
const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    
    // Validation
    if (!content || !chatId) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    
    // Create message
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });
    
    // Populate sender and chat
    message = await message.populate('sender', 'name pic');
    message = await message.populate('chat');
    
    // Populate nested users in chat
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });
    
    // Update chat's latest message
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Get All Messages in Chat
```javascript
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat')
      .sort({ createdAt: 1 }); // Oldest first
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## 16. Environment Variables (.env)

### .env File Structure
```env
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_secret_key_here_make_it_long_and_random
```

### Using Environment Variables
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Use in code
mongoose.connect(MONGO_URI);
jwt.sign({ id }, JWT_SECRET);
```

---

## 💡 Common Patterns

### Pattern 1: Find or Create
```javascript
const findOrCreateChat = async (userId1, userId2) => {
  // Try to find existing chat
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [userId1, userId2] },
  });
  
  // If not found, create new
  if (!chat) {
    chat = await Chat.create({
      users: [userId1, userId2],
      isGroupChat: false,
    });
  }
  
  return chat;
};
```

### Pattern 2: Pagination
```javascript
const getMessages = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const messages = await Message.find({ chat: req.params.chatId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  res.json({
    messages,
    page,
    limit,
    total: await Message.countDocuments({ chat: req.params.chatId }),
  });
};
```

### Pattern 3: Input Validation
```javascript
const validateInput = (req, res, next) => {
  const { email, password } = req.body;
  
  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  
  // Password validation
  if (!password || password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters' 
    });
  }
  
  next();
};
```

---

## 🎯 Practice Exercises

### Exercise 1: Create a Todo API
- POST /api/todos - Create todo
- GET /api/todos - Get all todos
- GET /api/todos/:id - Get single todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo

### Exercise 2: Add Pagination
- Modify GET /api/todos to support pagination
- Add query parameters: page, limit

### Exercise 3: Add Search
- Modify GET /api/todos to support search
- Search by title and description

---

**Practice writing these from memory until you can do it without looking! 🚀**


