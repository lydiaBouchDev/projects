const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'todos.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data persistence functions
function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadTodos() {
  try {
    ensureDataDirectory();
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(data);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading todos:', error.message);
  }

  // Return default todos if file doesn't exist or error occurred
  return {
    todos: [
      {
        id: 1,
        text: 'Welcome to your Todo App!',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        text: 'Click the checkbox to mark as complete',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        text: 'Click the trash icon to delete a todo',
        completed: false,
        createdAt: new Date().toISOString()
      }
    ],
    nextId: 4
  };
}

function saveTodos() {
  try {
    ensureDataDirectory();
    const data = JSON.stringify({ todos, nextId }, null, 2);
    fs.writeFileSync(DATA_FILE, data, 'utf8');
  } catch (error) {
    console.error('Error saving todos:', error.message);
  }
}

// Load todos from file on startup
const loadedData = loadTodos();
let todos = loadedData.todos;
let nextId = loadedData.nextId;

// Routes

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.json(todo);
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }

  const newTodo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  saveTodos();
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;

  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (text !== undefined) {
    todos[todoIndex].text = text.trim();
  }

  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }

  todos[todoIndex].updatedAt = new Date().toISOString();

  saveTodos();
  res.json(todos[todoIndex]);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  saveTodos();
  res.json(deletedTodo);
});

// Delete all completed todos
app.delete('/api/todos/completed/all', (req, res) => {
  const completedTodos = todos.filter(t => t.completed);
  todos = todos.filter(t => !t.completed);
  saveTodos();
  res.json({ deleted: completedTodos.length, todos: completedTodos });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo App server is running on http://localhost:${PORT}`);
  console.log(`📝 Open your browser and navigate to http://localhost:${PORT}`);
});
