// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const todoCount = document.getElementById('todoCount');
const clearCompletedBtn = document.getElementById('clearCompleted');

// State
let todos = [];
let currentFilter = 'all';

// API Base URL
const API_URL = '/api/todos';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);
}

// API Functions
async function loadTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to load todos');
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('Error loading todos:', error);
        showNotification('Failed to load todos', 'error');
    }
}

async function addTodo() {
    const text = todoInput.value.trim();

    if (!text) {
        todoInput.focus();
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error('Failed to add todo');

        const newTodo = await response.json();
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
        showNotification('Todo added successfully', 'success');
    } catch (error) {
        console.error('Error adding todo:', error);
        showNotification('Failed to add todo', 'error');
    }
}

async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !todo.completed })
        });

        if (!response.ok) throw new Error('Failed to update todo');

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        renderTodos();
    } catch (error) {
        console.error('Error toggling todo:', error);
        showNotification('Failed to update todo', 'error');
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        todos = todos.filter(t => t.id !== id);
        renderTodos();
        showNotification('Todo deleted', 'success');
    } catch (error) {
        console.error('Error deleting todo:', error);
        showNotification('Failed to delete todo', 'error');
    }
}

async function updateTodoText(id, newText) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newText })
        });

        if (!response.ok) throw new Error('Failed to update todo');

        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        renderTodos();
        showNotification('Todo updated', 'success');
    } catch (error) {
        console.error('Error updating todo:', error);
        showNotification('Failed to update todo', 'error');
    }
}

async function clearCompleted() {
    const completedTodos = todos.filter(t => t.completed);

    if (completedTodos.length === 0) {
        showNotification('No completed todos to clear', 'info');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/completed/all`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to clear completed todos');

        todos = todos.filter(t => !t.completed);
        renderTodos();
        showNotification(`Cleared ${completedTodos.length} completed todo(s)`, 'success');
    } catch (error) {
        console.error('Error clearing completed todos:', error);
        showNotification('Failed to clear completed todos', 'error');
    }
}

// Render Functions
function renderTodos() {
    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        todoList.innerHTML = filteredTodos.map(todo => createTodoElement(todo)).join('');
    }

    updateStats();
}

function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

function createTodoElement(todo) {
    return `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input
                type="checkbox"
                class="todo-checkbox"
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo(${todo.id})"
            >
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="edit-btn" onclick="editTodo(${todo.id})" title="Edit">
                    ✏️
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </li>
    `;
}

function updateStats() {
    const activeTodos = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`;
}

// Edit Todo
function editTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const todoText = todoItem.querySelector('.todo-text');
    const currentText = todoText.textContent;

    todoItem.classList.add('editing');

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;

    const editControls = document.createElement('div');
    editControls.className = 'edit-controls';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => saveTodoEdit(id, editInput.value);

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => cancelTodoEdit(id);

    editControls.appendChild(saveBtn);
    editControls.appendChild(cancelBtn);

    todoItem.appendChild(editInput);
    todoItem.appendChild(editControls);
    editInput.focus();
    editInput.select();

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveTodoEdit(id, editInput.value);
        } else if (e.key === 'Escape') {
            cancelTodoEdit(id);
        }
    });
}

function saveTodoEdit(id, newText) {
    const trimmedText = newText.trim();
    if (!trimmedText) {
        cancelTodoEdit(id);
        return;
    }

    updateTodoText(id, trimmedText);
}

function cancelTodoEdit(id) {
    renderTodos();
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}
