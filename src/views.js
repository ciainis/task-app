import { getTodos, toggleTodo, removeTodo } from './todos';
import { getFilters } from './filters';

const renderTodos = () => {
    const { searchText, hideCompleted } = getFilters();
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase());
        const hideCompletedMatch = !hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    const todosEl = document.querySelector('#todos');

    todosEl.innerHTML = '';
    todosEl.appendChild(generateSummaryDOM(incompleteTodos));

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todosEl.appendChild(generateTodoDOM(todo));
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'There are no to-dos to show';
        emptyMessage.classList.add('empty-message');
        todosEl.appendChild(emptyMessage);
    }
};

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const text = document.createElement('span');
    const button = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;
    containerEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        renderTodos();
    });

    text.textContent = todo.text;
    containerEl.appendChild(text);

    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    button.textContent = 'remove';
    button.classList.add('button', 'button--text');
    todoEl.appendChild(button);
    button.addEventListener('click', () => {
        removeTodo(todo.id);
        renderTodos();
    });

    return todoEl;
};

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    const plural = incompleteTodos.length  === 1 ? '' : 's';

    summary.classList.add('list-title');
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
    return summary;
};

export { renderTodos };