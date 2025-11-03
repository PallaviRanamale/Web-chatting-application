# ⚡ Backend Quick Reference Cheat Sheet

## 🎯 Project Overview (30 Second Pitch)
"I built a RESTful API with Node.js and Express.js for a real-time chat application. It handles user authentication with JWT, manages chats and messages using MongoDB, and implements real-time messaging with Socket.io. The architecture follows MVC pattern with separate routes, controllers, and models."

---

## 📚 Essential Node.js/Express Concepts

### Express Server Setup
```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON
app.listen(3000, () => console.log('Server running'));
```

### HTTP Methods
```javascript
router.get('/path', handler);      // Read
router.post('/path', handler);     // Create
router.put('/path', handler);      // Update
router.delete('/path', handler);   // Delete
```

### Request/Response
```javascript
req.body      // Request body data
req.params    // URL parameters (:id)
req.query     // Query string (?search=term)
req.headers   // HTTP headers
req.user      // Authenticated user (from middleware)

res.json()    // Send JSON response
res.status()  // Set status code
res.send()    // Send text/HTML
```

---

## 🗄 MongoDB/Mongoose Basics

### Schema Definition
```javascript
const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
}, { timestamps: true });

const Model = mongoose.model('Model', schema);
```

### Common Queries
```javascript
Model.create({...})                    // Create
Model.find({...})                     // Find all
Model.findOne({...})                  // Find one
Model.findById(id)                     // Find by ID
Model.findByIdAndUpdate(id, {...})    // Update
Model.findByIdAndDelete(id)           // Delete
Model.findOneAndDelete({...})          // Find and delete
```

### Query Operators
```javascript
{ email: { $regex: term, $options: 'i' } }  // Case-insensitive search
{ _id: { $ne: userId } }                    // Not equal
{ users: { $elemMatch: { $eq: userId } } }  // Array contains
{ $or: [{...}, {...}] }                     // OR condition
```

### Update Operators
```javascript
{ $push: { arrayField: value } }  // Add to array
{ $pull: { arrayField: value } }   // Remove from array
```

### Populate
```javascript
.populate('field', '-excludeField')  // Replace ObjectId with document
.populate('field1').populate('field2')  // Multiple
```

---

## 🔐 Authentication (JWT)

### Generate Token
```javascript
jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '30d' });
```

### Verify Token
```javascript
const decoded = jwt.verify(token, JWT_SECRET);
const user = await User.findById(decoded.id);
```

### Auth Middleware
```javascript
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
```

### Password Hashing
```javascript
// Hash
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

// Compare
const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
```

---

## 🔌 Socket.io Basics

### Server Setup
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('event', (data) => { ... });
  socket.emit('event', data);
  socket.join('room');
  io.to('room').emit('event', data);
});
```

### Common Events
```javascript
socket.on('connection')      // Client connects
socket.on('disconnect')      // Client disconnects
socket.join(roomId)          // Join room
socket.to(roomId).emit(...)  // Send to room
io.emit(...)                 // Broadcast to all
```

---

## 📝 Controller Pattern

### Basic Controller Structure
```javascript
const controller = async (req, res) => {
  try {
    // 1. Validate input
    // 2. Database operation
    // 3. Send response
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### With asyncHandler
```javascript
const controller = asyncHandler(async (req, res) => {
  // Code - errors automatically caught
});
```

---

## 🛣 Route Setup Pattern

### Define Routes
```javascript
const router = express.Router();
router.route('/')
  .get(handler)
  .post(handler);
router.get('/:id', handler);
module.exports = router;
```

### Use Routes
```javascript
app.use('/api/users', userRoutes);
```

---

## ⚠️ Error Handling

### Error Middleware
```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};
```

### Status Codes
```
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Server Error
```

---

## 📦 Project Structure

```
backend/
├── server.js              # Entry point
├── config/
│   ├── db.js             # Database connection
│   └── generateToken.js  # JWT generation
├── Models/               # Mongoose schemas
├── routes/               # Route definitions
├── controllers/          # Business logic
└── middleware/          # Auth, error handling
```

---

## 🎯 Common Patterns

### Find or Create
```javascript
let item = await Model.findOne({ condition });
if (!item) {
  item = await Model.create({ data });
}
```

### Search
```javascript
const keyword = search ? {
  $or: [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ]
} : {};
```

### Array Operations
```javascript
// Add to array
{ $push: { users: userId } }
// Remove from array
{ $pull: { users: userId } }
// Check if in array
{ users: { $elemMatch: { $eq: userId } } }
```

---

## 🔑 Key Concepts Quick Answers

**Q: What is Express?**
A: Web framework for Node.js, simplifies building APIs.

**Q: What is Mongoose?**
A: MongoDB object modeling library, provides schemas and validation.

**Q: What is JWT?**
A: JSON Web Token - stateless authentication token.

**Q: Why hash passwords?**
A: Security - one-way encryption, can't reverse to get original.

**Q: What is middleware?**
A: Functions that run between request and response.

**Q: What is populate?**
A: Replaces ObjectId references with actual documents.

**Q: What is Socket.io?**
A: Library for real-time bidirectional communication.

**Q: asyncHandler?**
A: Wrapper that automatically catches async errors.

---

## 📝 Code Snippets

### Create User
```javascript
const user = await User.create({ name, email, password });
res.status(201).json({ _id: user._id, name: user.name });
```

### Update User
```javascript
const user = await User.findByIdAndUpdate(
  id, 
  { name: 'New Name' }, 
  { new: true }
);
```

### Find with Populate
```javascript
const chat = await Chat.findById(id)
  .populate('users', '-password')
  .populate('latestMessage');
```

### Search Users
```javascript
const users = await User.find({
  $or: [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ],
}).find({ _id: { $ne: req.user._id } });
```

---

## ✅ Pre-Interview Checklist

- [ ] Can explain Express.js basics
- [ ] Understand MongoDB queries
- [ ] Know JWT authentication flow
- [ ] Understand password hashing
- [ ] Can explain Socket.io
- [ ] Understand middleware
- [ ] Know Mongoose populate
- [ ] Understand error handling
- [ ] Can write CRUD operations
- [ ] Know REST API principles

---

**Print this and keep it handy during interview prep! 🚀**


