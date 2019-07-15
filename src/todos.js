import uuidv4 from 'uuid/v4';

let todos = [];

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch(e) {
        todos = [];
    }
};

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    });
    saveTodos();
};

const removeTodo = (id) => {
    const index = todos.findIndex((todo) => {
        todo.id === id;
    });

    if (index > -1) {
        todos.splice(index, 1);
        saveTodos();
    }
};

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
    }
};

loadTodos();

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo};