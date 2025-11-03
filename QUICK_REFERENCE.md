# ⚡ Quick Reference Cheat Sheet - Frontend Interview

## 🎯 Project Overview (30 Second Pitch)
"NEAR CHAT is a real-time messaging app built with React. Users can register, login, search users, send messages, and create group chats. It uses Socket.io for real-time communication, Chakra UI for styling, and React Context for state management."

---

## 📚 Essential React Concepts

### useState Hook
```javascript
const [value, setValue] = useState(initialValue);
setValue(newValue);                    // Update state
setValue(prev => prev + 1);           // Update based on previous
```

### useEffect Hook
```javascript
useEffect(() => {
  // Code runs after render
}, [dependencies]);

// Empty [] = run once on mount
// [var] = run when var changes
// No array = run every render (avoid!)
```

### Props
```javascript
// Parent sends data
<ChildComponent name="John" age={25} />

// Child receives
const ChildComponent = ({ name, age }) => { ... }
```

### Event Handlers
```javascript
onClick={() => handleClick()}
onChange={(e) => setValue(e.target.value)}
onSubmit={(e) => { e.preventDefault(); ... }}
onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
```

---

## 🔑 Key JavaScript Concepts

### Destructuring
```javascript
const { user, chats } = ChatState();        // Object
const [first, second] = array;               // Array
const [value, setValue] = useState(0);       // Array (hooks)
```

### Spread Operator
```javascript
[...array, newItem]              // Add to array
[...oldArray, ...newArray]       // Combine arrays
{...obj, newProp: value}        // Add/update object property
```

### Array Methods
```javascript
array.map(item => <div key={item.id}>{item.name}</div>)
array.filter(item => item.active)
array.find(item => item.id === 5)
array.forEach(item => console.log(item))
```

### Ternary Operator
```javascript
condition ? trueValue : falseValue
{loading ? <Spinner /> : <Content />}
{user ? <Dashboard /> : <Login />}
```

---

## 🌐 API Calls with Axios

### GET Request
```javascript
const { data } = await axios.get('/api/endpoint', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### POST Request
```javascript
const { data } = await axios.post('/api/endpoint', 
  { email, password },
  { headers: { 'Content-Type': 'application/json' } }
);
```

### Complete Pattern
```javascript
try {
  setLoading(true);
  const { data } = await axios.get('/api/endpoint');
  setData(data);
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
```

---

## 🎨 Conditional Rendering Patterns

```javascript
// Method 1: &&
{condition && <Component />}

// Method 2: Ternary
{condition ? <ComponentA /> : <ComponentB />}

// Method 3: Early return
if (!user) return <Login />;
```

---

## 📦 Context API Pattern

```javascript
// 1. Create Context
const MyContext = createContext();

// 2. Provider
<MyContext.Provider value={{ data, setData }}>
  {children}
</MyContext.Provider>

// 3. Hook
const { data, setData } = useContext(MyContext);
```

---

## 🔄 Common Patterns in Your Project

### Controlled Input
```javascript
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Form Submission
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form
};
<form onSubmit={handleSubmit}>...</form>
```

### Fetch on Mount
```javascript
useEffect(() => {
  const fetchData = async () => {
    const { data } = await axios.get('/api/endpoint');
    setData(data);
  };
  fetchData();
}, []);
```

### Map to Render List
```javascript
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## 💾 LocalStorage

```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key'));

// Remove
localStorage.removeItem('key');
```

---

## 🔌 Socket.io Basics

```javascript
// Connect
const socket = io(ENDPOINT);

// Emit (send)
socket.emit('eventName', data);

// Listen (receive)
socket.on('eventName', (data) => {
  // Handle received data
});
```

---

## 🎯 Common Interview Questions - Quick Answers

**Q: What is React?**
A: JavaScript library for building UIs using components. Uses virtual DOM for efficient updates.

**Q: What is JSX?**
A: Syntax extension that lets you write HTML-like code in JavaScript.

**Q: State vs Props?**
A: Props = data from parent (read-only). State = data inside component (can change).

**Q: What are React Hooks?**
A: Functions that let you use state and lifecycle features in functional components.

**Q: useEffect dependency array?**
A: Controls when effect runs. `[]` = once, `[var]` = when var changes.

**Q: Controlled vs Uncontrolled inputs?**
A: Controlled = React manages value via state. Uncontrolled = DOM manages value via refs.

**Q: What is Context API?**
A: Way to share data across components without prop drilling.

**Q: Key prop in lists?**
A: Helps React identify which items changed. Should be unique and stable.

**Q: What is Virtual DOM?**
A: JavaScript representation of DOM. React compares old vs new, updates only differences.

**Q: Event handling in React?**
A: Use camelCase (onClick, onChange). Pass function or arrow function.

---

## 🏗 Component Structure Template

```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState(initialValue);

  // 2. useEffect hooks
  useEffect(() => {
    // Effect code
  }, [dependencies]);

  // 3. Event handlers
  const handleClick = () => {
    // Handler code
  };

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Modifying state directly: `state.push(item)` 
   ✅ Use setter: `setState([...state, item])`

2. ❌ Missing key in lists: `{items.map(item => <div>{item}</div>)}`
   ✅ Add key: `{items.map(item => <div key={item.id}>{item}</div>)}`

3. ❌ Forgetting e.preventDefault() in forms
   ✅ Always use: `const handleSubmit = (e) => { e.preventDefault(); ... }`

4. ❌ useEffect without dependencies
   ✅ Always include dependency array: `useEffect(() => {}, [])`

5. ❌ Not handling loading/error states in API calls
   ✅ Always use try/catch and loading states

---

## 📝 Your Project Structure

```
frontend1/
├── src/
│   ├── index.js          # Entry point
│   ├── App.js            # Routing setup
│   ├── Pages/
│   │   ├── Homepage.js   # Login/Signup
│   │   └── ChatPage.js   # Main chat interface
│   ├── components/       # Reusable components
│   ├── Context/          # Global state (Context API)
│   └── config/           # Helper functions
```

---

## 🎓 Key Technologies Used

- **React 18** - UI library
- **React Router** - Navigation
- **Chakra UI** - Component library
- **Axios** - HTTP requests
- **Socket.io** - Real-time communication
- **Context API** - State management

---

## ✅ Pre-Interview Checklist

- [ ] Can explain what React is
- [ ] Understand useState and useEffect
- [ ] Know how to make API calls
- [ ] Can write a simple component
- [ ] Understand props and state
- [ ] Know how Context works
- [ ] Can explain your project structure
- [ ] Understand event handling
- [ ] Know controlled inputs
- [ ] Can explain real-time features

---

**Print this and keep it handy! Good luck! 🚀**


