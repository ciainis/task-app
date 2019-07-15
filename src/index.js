import { renderTodos } from './views';
import { setFilters } from './filters';
import { createTodo, loadTodos } from './todos';

renderTodos();

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    });
    renderTodos();
});

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    });   
    renderTodos();
});

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.todoText.value.trim();
    e.preventDefault();
    
    if (text.length > 0) {
        createTodo(text);
        renderTodos();
        e.target.elements.todoText.value = '';
    } 
});

window.addEventListener('storage', (e) => {
    if (e.keys === 'todos') {
        loadTodos();
        renderTodos();
    }
});