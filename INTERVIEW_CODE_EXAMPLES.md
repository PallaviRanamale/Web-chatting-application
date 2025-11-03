# 🎯 Interview Code Examples - Practice These!

These are common code snippets you might be asked to write in a frontend interview.

---

## 1. Basic Component Structure

### Simple Functional Component
```javascript
import React from 'react';

const WelcomeComponent = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>This is a simple React component</p>
    </div>
  );
};

export default WelcomeComponent;
```

**Key Points:**
- Always import React
- Component name should start with capital letter
- Return JSX (JavaScript XML)
- Export default so other files can import it

---

## 2. Component with Props

### Receiving and Using Props
```javascript
import React from 'react';

const UserCard = ({ name, email, age }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
};

// Usage:
// <UserCard name="John" email="john@example.com" age={25} />

export default UserCard;
```

**Key Points:**
- Props are destructured in function parameters
- Use curly braces `{}` to embed JavaScript in JSX
- Props are read-only (cannot be modified)

---

## 3. useState Hook - Managing State

### Counter Component
```javascript
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```

**Key Points:**
- `useState(0)` returns `[value, setValue]`
- Always use the setter function to update state
- Never modify state directly: `count++` ❌, `setCount(count + 1)` ✅

---

## 4. Handling Form Inputs

### Login Form Component
```javascript
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    
    // Validation
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    // Handle login (API call, etc.)
    console.log('Login attempt:', { email, password });
    setError(''); // Clear error on success
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
```

**Key Points:**
- Controlled inputs: `value` and `onChange` are required
- `e.preventDefault()` prevents form submission refresh
- Always validate user input

---

## 5. Multiple Inputs with Single State Object

### Registration Form (Better Approach)
```javascript
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,        // Spread existing values
      [name]: value      // Update specific field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
```

**Key Points:**
- Use spread operator `...` to preserve other fields
- `[name]: value` dynamically updates the field by name
- More maintainable than separate useState for each field

---

## 6. useEffect - Fetching Data

### Fetching Users from API
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/users');
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty array = run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
```

**Key Points:**
- useEffect runs after component renders
- Empty dependency array `[]` means run once
- Always handle loading and error states
- Use `key` prop when mapping over arrays

---

## 7. Conditional Rendering

### Different Ways to Conditionally Render
```javascript
import React, { useState } from 'react';

const ConditionalExample = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Method 1: Ternary Operator */}
      {isLoggedIn ? (
        <div>Welcome back!</div>
      ) : (
        <div>Please log in</div>
      )}

      {/* Method 2: && Operator (if true, show) */}
      {user && <div>User: {user.name}</div>}

      {/* Method 3: Early Return (in component function) */}
      {!isLoggedIn && <button onClick={() => setIsLoggedIn(true)}>Login</button>}

      {/* Method 4: Multiple Conditions */}
      {count === 0 && <p>Count is zero</p>}
      {count > 0 && count < 10 && <p>Count is between 1 and 9</p>}
      {count >= 10 && <p>Count is 10 or more</p>}
    </div>
  );
};

export default ConditionalExample;
```

---

## 8. Rendering Lists

### List Component with Map
```javascript
import React from 'react';

const TodoList = ({ todos }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos yet!</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id || index}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <span>{todo.completed ? '✅' : '⏳'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Usage:
// const todos = [
//   { id: 1, title: 'Learn React', description: 'Study hooks', completed: false },
//   { id: 2, title: 'Build App', description: 'Create chat app', completed: true }
// ];
// <TodoList todos={todos} />

export default TodoList;
```

**Key Points:**
- Always use `key` prop (unique identifier)
- Can use index if no unique ID, but not recommended if list changes
- Handle empty arrays

---

## 9. Parent-Child Communication

### Parent Sending Data to Child & Child Calling Parent Function
```javascript
// Parent Component
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [message, setMessage] = useState('Hello from Parent');
  const [count, setCount] = useState(0);

  const handleChildClick = (data) => {
    console.log('Child clicked with:', data);
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <ChildComponent
        message={message}
        onButtonClick={handleChildClick}
      />
    </div>
  );
};

export default ParentComponent;

// Child Component
const ChildComponent = ({ message, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick('Child was clicked!');
  };

  return (
    <div>
      <p>Message from parent: {message}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default ChildComponent;
```

**Key Points:**
- Parent passes data via props (downward)
- Child communicates with parent via callback functions (upward)
- Never mutate props directly

---

## 10. useContext - Global State

### Simple Context Example
```javascript
// Step 1: Create Context
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Step 2: Create Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Create Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Step 4: Use in Component
import { useTheme } from './ThemeContext';

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// Step 5: Wrap App
// In index.js or App.js:
// <ThemeProvider>
//   <App />
// </ThemeProvider>
```

---

## 11. API Call with Loading and Error States

### Complete API Integration Pattern
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/data');
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Success state
  return (
    <div>
      <h2>Data Loaded Successfully</h2>
      {data && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataFetchingComponent;
```

---

## 12. Search/Filter Functionality

### Search Component
```javascript
import React, { useState, useMemo } from 'react';

const SearchComponent = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div>
        {filteredItems.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredItems.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
```

**Key Points:**
- `useMemo` optimizes filtering (only recalculates when dependencies change)
- Always handle empty search results

---

## 13. LocalStorage Persistence

### Save and Load from LocalStorage
```javascript
import React, { useState, useEffect } from 'react';

const LocalStorageExample = () => {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userName');
    if (saved) {
      setSavedName(saved);
      setName(saved);
    }
  }, []);

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem('userName', name);
    setSavedName(name);
    alert('Name saved!');
  };

  // Clear localStorage
  const handleClear = () => {
    localStorage.removeItem('userName');
    setName('');
    setSavedName('');
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
      {savedName && <p>Saved Name: {savedName}</p>}
    </div>
  );
};

export default LocalStorageExample;
```

---

## 14. Event Handling Patterns

### Common Event Handlers
```javascript
import React, { useState } from 'react';

const EventHandlingExamples = () => {
  const [text, setText] = useState('');

  // Click event
  const handleClick = () => {
    alert('Button clicked!');
  };

  // Click with event object
  const handleClickWithEvent = (e) => {
    e.preventDefault();
    console.log('Button clicked', e);
  };

  // Input change
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  // Key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter pressed');
      handleSubmit();
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Form submitted with:', text);
  };

  // Click with parameter
  const handleItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
  };

  return (
    <div>
      <button onClick={handleClick}>Simple Click</button>
      
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type and press Enter"
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {[1, 2, 3].map(item => (
          <button key={item} onClick={() => handleItemClick(item)}>
            Item {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventHandlingExamples;
```

---

## 15. useEffect Cleanup (Important!)

### Cleanup Function for Subscriptions
```javascript
import React, { useState, useEffect } from 'react';

const SubscriptionExample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This is like setting up a subscription
    const intervalId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      clearInterval(intervalId);
      console.log('Interval cleared');
    };
  }, []); // Empty array = setup once, cleanup on unmount

  return (
    <div>
      <h2>Count: {count}</h2>
      <p>This counter runs every second</p>
    </div>
  );
};

export default SubscriptionExample;
```

**Key Points:**
- Always cleanup subscriptions, intervals, and event listeners
- Prevents memory leaks
- Cleanup function runs before next effect or on unmount

---

## 🎯 Quick Practice Exercises

### Exercise 1: Create a Todo Component
Create a component that:
- Shows a list of todos
- Allows adding new todos
- Allows marking todos as complete
- Allows deleting todos

### Exercise 2: Create a Weather Display
Create a component that:
- Has an input field for city name
- Fetches weather data when user submits
- Shows loading state
- Shows error if city not found
- Displays weather information

### Exercise 3: Create a Shopping Cart
Create a component that:
- Shows list of products
- Allows adding items to cart
- Shows cart total
- Allows removing items from cart

---

## 💡 Tips for Writing Code in Interviews

1. **Start with Structure**: Write the component skeleton first
2. **Add State**: Identify what needs to be stored in state
3. **Add Handlers**: Write event handler functions
4. **Add JSX**: Write the return statement with JSX
5. **Test Logic**: Think through edge cases
6. **Explain as You Go**: Narrate your thought process

---

**Practice these examples until you can write them from memory!** 🚀


