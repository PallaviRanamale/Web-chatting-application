# Complete Frontend Guide - NEAR CHAT Application

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Frontend Architecture](#frontend-architecture)
4. [Key React Concepts Explained](#key-react-concepts-explained)
5. [Component Breakdown](#component-breakdown)
6. [Data Flow & State Management](#data-flow--state-management)
7. [Important Concepts for Interview](#important-concepts-for-interview)
8. [Common Interview Questions & Answers](#common-interview-questions--answers)
9. [Code Examples You Should Know](#code-examples-you-should-know)

---

## 🎯 Project Overview

**NEAR CHAT** is a **real-time chat application** similar to WhatsApp or Telegram. It allows users to:
- Register and login
- Search for other users
- Send one-on-one messages
- Create and manage group chats
- Receive messages in real-time using WebSockets

### Architecture Type
- **Full-Stack Application**: Frontend (React) + Backend (Node.js/Express)
- **Real-time Communication**: Uses Socket.io for instant messaging
- **RESTful API**: Backend provides REST endpoints for data operations

---

## 🛠 Technology Stack

### Frontend Technologies:
1. **React 18.2.0** - JavaScript library for building user interfaces
2. **React Router DOM 5.3.4** - For navigation between pages
3. **Chakra UI 2.8.2** - Component library for styling (like Bootstrap, but for React)
4. **Axios 1.6.8** - For making HTTP requests to the backend
5. **Socket.io-client 4.7.5** - For real-time communication
6. **React Scripts** - Build tool (Create React App)

### Why These Technologies?
- **React**: Component-based, reusable code
- **Chakra UI**: Pre-built components, faster development
- **Axios**: Better than fetch() - automatic JSON parsing, interceptors
- **Socket.io**: Real-time updates without page refresh

---

## 🏗 Frontend Architecture

### Project Structure
```
frontend1/
├── public/              # Static files (HTML, images)
│   └── index.html       # Main HTML file
├── src/
│   ├── index.js         # Entry point - renders App component
│   ├── App.js           # Main app component with routing
│   ├── Pages/           # Page components
│   │   ├── Homepage.js  # Login/Signup page
│   │   └── ChatPage.js  # Main chat interface
│   ├── components/      # Reusable components
│   │   ├── Authentification/
│   │   │   ├── Login.js
│   │   │   └── SignUp.js
│   │   ├── ChatBox.js
│   │   ├── MyChats.js
│   │   ├── SingleChat.js
│   │   └── miscellaneous/
│   ├── Context/         # State management
│   │   └── ChatProvider.js
│   └── config/          # Helper functions
│       └── ChatLogics.js
```

---

## 💡 Key React Concepts Explained

### 1. **Components**
Think of components as LEGO blocks. Each component is a reusable piece of UI.

**Example from your project:**
```javascript
// Login.js is a component
const Login = () => {
  return <div>Login Form</div>;
}
```

**Why use components?**
- Reusable code (write once, use many times)
- Organized code (each component handles one thing)
- Easier to maintain and test

### 2. **JSX (JavaScript XML)**
JSX lets you write HTML-like syntax in JavaScript.

```javascript
// This looks like HTML but it's JavaScript
return (
  <Box>
    <Text>Hello World</Text>
  </Box>
);
```

**Important**: Always return ONE parent element (or use React Fragment `<>...</>`)

### 3. **Props (Properties)**
Props are like function parameters - they pass data from parent to child component.

```javascript
// Parent component
<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />

// Child component receives props
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  // Can use fetchAgain and setFetchAgain here
}
```

### 4. **State (useState Hook)**
State stores data that can change. When state changes, React re-renders the component.

```javascript
const [email, setEmail] = useState(''); // email is the value, setEmail updates it
const [loading, setLoading] = useState(false);
```

**Why useState?**
- Without state, you can't update the UI dynamically
- When you call `setEmail('new@email.com')`, React automatically re-renders

### 5. **useEffect Hook**
Runs code after component renders. Like "do something after the page loads."

```javascript
useEffect(() => {
  // This runs when component first loads
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  setUser(userInfo);
}, []); // Empty array means "run only once"
```

**Dependencies Array:**
- `[]` - Run once on mount
- `[variable]` - Run when variable changes
- No array - Run on every render (usually avoid this)

### 6. **Context API (Global State)**
Context lets you share data across components without passing props through every level.

```javascript
// In ChatProvider.js - Create context
const ChatContext = createContext();

// Provide data to all children
<ChatContext.Provider value={{user, setUser, chats}}>
  {children}
</ChatContext.Provider>

// In any component - Use context
const { user, chats } = ChatState(); // Get data from context
```

**Why Context?**
- Without Context: Pass props through 5+ components (prop drilling)
- With Context: Access data directly from any component

### 7. **React Router**
Handles navigation between pages without page refresh (Single Page Application).

```javascript
// Define routes
<Route path='/' component={Homepage} />
<Route path='/chats' component={ChatPage} />

// Navigate programmatically
history.push('/chats');
```

### 8. **Async/Await & API Calls**
Making HTTP requests to get/send data.

```javascript
const fetchChats = async () => {
  try {
    const { data } = await axios.get("/api/chat", config);
    setChats(data); // Update state with received data
  } catch (error) {
    // Handle errors
  }
};
```

**Key Points:**
- `async/await` - Modern way to handle promises (cleaner than .then())
- `axios` - Library for HTTP requests
- Always use `try/catch` for error handling

---

## 🧩 Component Breakdown

### 1. **App.js** - Application Entry Point
```javascript
function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Homepage} exact/>
      <Route path='/chats' component={ChatPage}/>
    </BrowserRouter>
  );
}
```
**What it does:**
- Sets up routing
- Defines which component shows for each URL

**Interview Answer:**
"This is the root component that sets up routing. When user visits `/`, they see Homepage. When they visit `/chats`, they see ChatPage."

### 2. **Homepage.js** - Authentication Page
```javascript
const Homepage = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.isAuthenticated) {
      history.push("/chats"); // Redirect if already logged in
    }
  }, [history]);

  return (
    <Container>
      <Tabs>
        <TabPanel><Login/></TabPanel>
        <TabPanel><SignUp/></TabPanel>
      </Tabs>
    </Container>
  );
}
```

**Key Features:**
- Uses `useEffect` to check if user is already logged in
- Uses Chakra UI `Tabs` for Login/Signup toggle
- Redirects authenticated users to chat page

**Interview Talking Points:**
- "I use localStorage to persist user login across sessions"
- "The useEffect checks authentication on component mount"
- "I prevent authenticated users from seeing login page"

### 3. **Login.js** - Login Form
```javascript
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({ title: "Please Fill all the Fields", status: "warning" });
      return;
    }
    
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data); // Update context
      history.push("/chats");
    } catch (error) {
      toast({ title: "Error!", description: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={submitHandler} isLoading={loading}>LOGIN</Button>
    </VStack>
  );
}
```

**Key Concepts:**
- **Controlled Inputs**: Input value is controlled by state (`value={email}`)
- **Form Validation**: Checks if fields are filled before submitting
- **Loading State**: Shows spinner while API call is in progress
- **Error Handling**: Uses toast notifications for errors
- **LocalStorage**: Saves user data to browser storage
- **Context Update**: Updates global user state

**Interview Answer Format:**
"The Login component uses controlled inputs where the input value is bound to state. When the user submits, I validate the form, make an API call with axios, handle loading and error states, save user data to localStorage for persistence, update the context, and redirect to the chat page."

### 4. **ChatPage.js** - Main Chat Interface
```javascript
const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div>
      {user && <SideDrawer />}
      <Box display="flex">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
}
```

**Layout Structure:**
- **SideDrawer**: Top navigation bar (search, profile, logout)
- **MyChats**: Left sidebar (list of all chats)
- **ChatBox**: Right side (message display and input)

**Why Conditional Rendering (`{user && ...}`)?**
- Only shows chat UI if user is logged in
- Prevents errors if user is null

### 5. **MyChats.js** - Chat List Component
```javascript
const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { data } = await axios.get("/api/chat", config);
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box>
      {chats.map((chat) => (
        <Box 
          onClick={() => setSelectedChat(chat)}
          bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
        >
          <Text>{!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}</Text>
        </Box>
      ))}
    </Box>
  );
}
```

**Key Features:**
- **Fetches chats from API**: Gets list of all user's chats
- **Maps over chats**: Renders each chat as a clickable box
- **Conditional styling**: Highlights selected chat
- **Re-fetches when fetchAgain changes**: Refreshes list when new chat is created

**Interview Points:**
- "I use the Authorization header with Bearer token for authenticated requests"
- "The useEffect dependency on fetchAgain allows refreshing the list when new chats are created"
- "I use map() to render lists in React - each item needs a unique key"

### 6. **SingleChat.js** - Message Display & Input
```javascript
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  // Fetch messages when chat is selected
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  // Socket.io setup for real-time
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  // Listen for new messages
  useEffect(() => {
    socket.on("new message", (newMessageReceived) => {
      if (selectedChatCompare._id === newMessageReceived.chat._id) {
        setMessages(prevMessages => [...prevMessages, newMessageReceived]);
      }
    });
  }, []);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      const { data } = await axios.post("/api/message", {
        content: newMessage,
        chatID: selectedChat._id
      }, config);
      
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    }
  };

  return (
    <>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <ScrollableChat messages={messages} />
        )}
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={sendMessage}
        />
      </Box>
    </>
  );
}
```

**Real-time Features:**
- **Socket.io Connection**: Connects to WebSocket server for real-time updates
- **Emit Events**: Sends messages to server (`socket.emit("new message", data)`)
- **Listen Events**: Receives messages from server (`socket.on("new message", ...)`)
- **Conditional Rendering**: Only adds message if it's for current chat

**Interview Explanation:**
"SingleChat handles both sending and receiving messages. When a user types and presses Enter, I send the message via axios POST request to save it in the database, then emit it through Socket.io so other users receive it instantly. I also listen for incoming messages via Socket.io and update the messages state, but only if it's for the currently selected chat to prevent showing messages in wrong chats."

### 7. **ChatProvider.js** - Global State Management
```javascript
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push('/');
    }
  }, [history]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
```

**What it does:**
- Creates a global state that all components can access
- Stores: current user, selected chat, list of chats
- Automatically loads user from localStorage on mount
- Redirects to home if no user found

**Why Context over Props?**
- Without Context: Pass user through Homepage → ChatPage → MyChats → ChatBox (4 levels!)
- With Context: Any component can access user directly

---

## 🔄 Data Flow & State Management

### How Data Flows in This App:

1. **User Login Flow:**
   ```
   User enters email/password → Login.js 
   → axios POST to /api/user/login 
   → Backend validates 
   → Returns user data + token
   → Save to localStorage
   → Update Context (setUser)
   → Redirect to /chats
   ```

2. **Loading Chats:**
   ```
   ChatPage loads → MyChats component mounts
   → useEffect runs fetchChats()
   → axios GET /api/chat with auth token
   → Backend returns chats array
   → setChats(data) updates context
   → Component re-renders with chats
   ```

3. **Sending Message:**
   ```
   User types message → SingleChat component
   → User presses Enter → sendMessage()
   → axios POST /api/message (saves to database)
   → socket.emit("new message") (broadcasts to other users)
   → setMessages([...messages, data]) (updates local state)
   → Other users receive via socket.on("new message")
   ```

4. **Real-time Updates:**
   ```
   User A sends message
   → Backend receives via Socket.io
   → Backend emits to all users in that chat room
   → User B's browser receives event
   → socket.on("new message") fires
   → setMessages updates state
   → UI re-renders showing new message
   ```

---

## 🎯 Important Concepts for Interview

### 1. **Component Lifecycle (with Hooks)**
- **Mount**: Component first appears on screen
  - useEffect with `[]` runs once
- **Update**: Component re-renders due to state/prop change
  - useEffect with dependencies runs
- **Unmount**: Component is removed
  - Cleanup function in useEffect

### 2. **State vs Props**
- **Props**: Data passed FROM parent TO child (one-way, read-only)
- **State**: Data managed INSIDE component (can be updated)

### 3. **Controlled vs Uncontrolled Inputs**
```javascript
// Controlled (your project uses this)
<Input value={email} onChange={(e) => setEmail(e.target.value)} />

// Uncontrolled (not used in your project)
<Input ref={inputRef} />
```

### 4. **Event Handling**
```javascript
// onClick event
<Button onClick={handleClick}>Click me</Button>

// onChange event
<Input onChange={(e) => setValue(e.target.value)} />

// onKeyDown event
<Input onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
```

### 5. **Conditional Rendering**
```javascript
// Method 1: && operator (used in your project)
{user && <ChatBox />}

// Method 2: Ternary operator
{loading ? <Spinner /> : <Content />}

// Method 3: if statement (outside JSX)
if (!user) return <Login />;
```

### 6. **Array Methods (Very Important!)**
```javascript
// map() - Transform array to JSX (used everywhere)
chats.map(chat => <Box key={chat._id}>{chat.name}</Box>)

// filter() - Filter array items
chats.filter(chat => chat.isGroupChat)

// find() - Find one item
chats.find(chat => chat._id === selectedChatId)

// forEach() - Loop through (doesn't return anything)
messages.forEach(msg => console.log(msg))
```

### 7. **Spread Operator (...)** - CRITICAL!
```javascript
// Add item to array (used in SingleChat.js)
setMessages([...messages, newMessage]);

// Copy object
const newUser = {...user, name: "New Name"};

// Combine arrays
const allMessages = [...oldMessages, ...newMessages];
```

### 8. **Async/Await Pattern**
```javascript
// Always use try/catch with async/await
const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get("/api/endpoint");
    setData(data);
  } catch (error) {
    toast({ title: "Error", description: error.message });
  } finally {
    setLoading(false);
  }
};
```

### 9. **Destructuring**
```javascript
// Object destructuring (used extensively)
const { user, chats, selectedChat } = ChatState();
const { email, password } = formData;

// Array destructuring
const [first, second] = array;
const [value, setValue] = useState(0);

// Function parameter destructuring
const Component = ({ prop1, prop2 }) => { ... }
```

---

## 💬 Common Interview Questions & Answers

### Q1: "Explain your project in 2 minutes"
**Answer:**
"I built NEAR CHAT, a real-time messaging application similar to WhatsApp. The frontend is built with React and uses Chakra UI for styling. Users can register, login, search for other users, and send messages. The app uses Socket.io for real-time communication, so messages appear instantly without refreshing. I implemented authentication using JWT tokens stored in localStorage, and used React Context API to manage global state like the current user and selected chat. The application has a responsive design with a chat list sidebar and message display area."

### Q2: "Why did you choose React?"
**Answer:**
"React's component-based architecture makes code reusable and maintainable. For example, I created a Login component that could be reused anywhere. React's virtual DOM ensures efficient updates - only changed parts re-render. The ecosystem is rich with libraries like Chakra UI for components and Socket.io for real-time features. React hooks like useState and useEffect simplify state management and side effects compared to class components."

### Q3: "How do you handle state management?"
**Answer:**
"I use a combination of local state with useState and global state with Context API. Local state handles component-specific data like form inputs. Context API manages shared data like user authentication, selected chat, and chat list that multiple components need. For example, when a user logs in, I update the user in Context, and all components can access it without prop drilling."

### Q4: "Explain how real-time messaging works"
**Answer:**
"I use Socket.io for real-time communication. When the app loads, I establish a WebSocket connection. When a user sends a message, I first save it to the database via REST API using axios. Then I emit the message through Socket.io, which broadcasts it to all users in that chat room. Other users receive the message through socket.on('new message') event, and I update the messages state, causing React to re-render and show the new message instantly."

### Q5: "How do you handle authentication?"
**Answer:**
"When a user logs in, the backend returns a JWT token along with user data. I store this in localStorage for persistence across sessions. I also update the Context with user data. For authenticated API requests, I include the token in the Authorization header. I check localStorage on app load to restore the session. If no token exists, I redirect to the login page."

### Q6: "What is the difference between useState and useEffect?"
**Answer:**
"useState is for storing and updating data that affects the UI. When you call setState, React re-renders the component. useEffect is for side effects - things that happen after render, like API calls, setting up subscriptions, or updating document title. In my project, I use useState for form inputs and useEffect for fetching data when components mount."

### Q7: "How do you prevent prop drilling?"
**Answer:**
"I use React Context API. Instead of passing user data through Homepage → ChatPage → MyChats → ChatBox, I wrap the app in ChatProvider. Any component can access the user data using ChatState() hook. This eliminates the need to pass props through intermediate components that don't use the data."

### Q8: "What happens when you call setState?"
**Answer:**
"When setState is called, React schedules a re-render. It compares the new virtual DOM with the previous one (diffing algorithm) and only updates the actual DOM where changes occurred. This is efficient because it doesn't re-render the entire page. For example, when I update messages array with setMessages, only the message list component re-renders, not the entire chat page."

### Q9: "How do you handle errors?"
**Answer:**
"I use try-catch blocks for all async operations. When an error occurs, I show user-friendly error messages using Chakra UI's toast notifications. I also set loading states to false in the finally block to ensure UI updates even if there's an error. For network errors, I display appropriate messages so users know what went wrong."

### Q10: "What is the key prop and why is it important?"
**Answer:**
"When rendering lists with map(), React needs a unique key for each item to efficiently track which items changed, were added, or removed. Without keys, React might re-render more than necessary or cause bugs. I use chat._id as the key since each chat has a unique ID from the database."

---

## 📝 Code Examples You Should Know

### 1. Create a Simple Form Component
```javascript
const SimpleForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log({ name, email });
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 2. Fetch Data from API
```javascript
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### 3. Create a Custom Hook
```javascript
// Custom hook for fetching data
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
const MyComponent = () => {
  const { data, loading, error } = useFetch('/api/chats');
  // Use data, loading, error
};
```

### 4. Conditional Rendering Examples
```javascript
const ConditionalComponent = ({ user, loading }) => {
  // Method 1: Early return
  if (loading) return <Spinner />;
  if (!user) return <Login />;

  // Method 2: Ternary
  return (
    <div>
      {user ? <UserProfile user={user} /> : <Login />}
      {loading && <Spinner />}
    </div>
  );
};
```

### 5. Handling Input Changes
```javascript
const FormComponent = () => {
  // Multiple inputs - can use one state object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,           // Keep existing values
      [e.target.name]: e.target.value  // Update specific field
    });
  };

  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
};
```

### 6. Context API Setup (Simplified)
```javascript
// 1. Create Context
const UserContext = createContext();

// 2. Create Provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create Hook
const useUser = () => useContext(UserContext);

// 4. Use in Component
const MyComponent = () => {
  const { user, setUser } = useUser();
  // Use user and setUser
};
```

### 7. Event Handler Patterns
```javascript
const EventExamples = () => {
  // Click handler
  const handleClick = () => {
    console.log('Clicked');
  };

  // Click with parameter
  const handleItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Important!
    // Handle submit
  };

  // Input change
  const handleChange = (e) => {
    const value = e.target.value;
    // Handle change
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={() => handleItemClick(123)}>Click Item</button>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} />
      </form>
    </div>
  );
};
```

---

## 🎓 Quick Reference: React Hooks Cheat Sheet

### useState
```javascript
const [value, setValue] = useState(initialValue);
setValue(newValue);           // Update state
setValue(prev => prev + 1);   // Update based on previous value
```

### useEffect
```javascript
useEffect(() => {
  // Code to run
}, [dependencies]);  // Empty [] = run once, [var] = run when var changes
```

### useContext
```javascript
const { value } = useContext(MyContext);
```

### Custom Hooks
```javascript
const useCustomHook = () => {
  // Hook logic
  return { value1, value2 };
};
```

---

## 🚀 Tips for Interview Success

1. **Practice Explaining Concepts**: Explain each concept out loud as if to an interviewer
2. **Understand the "Why"**: Know why you chose each technology/approach
3. **Be Honest**: If you don't know something, say "I haven't worked with that, but based on my knowledge of React..."
4. **Show Enthusiasm**: Express genuine interest in learning and improving
5. **Prepare for Live Coding**: Practice writing components from scratch
6. **Know Your Project Deeply**: Be able to explain any part in detail

---

## 📚 Additional Learning Resources

- **React Official Docs**: https://react.dev
- **Chakra UI Docs**: https://chakra-ui.com
- **React Router**: https://reactrouter.com
- **Socket.io**: https://socket.io/docs/v4/

---

## ✅ Final Checklist Before Interview

- [ ] I can explain what React is and why it's used
- [ ] I understand the difference between state and props
- [ ] I can explain useEffect and useState
- [ ] I know how to fetch data from an API
- [ ] I understand Context API and when to use it
- [ ] I can explain how real-time updates work with Socket.io
- [ ] I can write a simple React component from memory
- [ ] I understand controlled inputs
- [ ] I know how to handle form submissions
- [ ] I can explain the data flow in my application

---

**Good luck with your interview! You've got this! 🎉**


