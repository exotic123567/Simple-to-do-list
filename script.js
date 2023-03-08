const form = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');

form.addEventListener('submit', e => {
  e.preventDefault();
  const todoItem = document.querySelector('#todo-item').value;
  addToDo(todoItem);
});

function addToDo(item) {
  const li = document.createElement('li');
  li.innerHTML = item;
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', markAsComplete);
  li.prepend(checkbox);
  todoList.appendChild(li);
  saveToDoList();
}

function markAsComplete() {
  const li = this.parentNode;
  li.classList.toggle('completed');
  saveToDoList();
}

function saveToDoList() {
  const todoItems = todoList.querySelectorAll('li');
  const todoListArray = [];
  todoItems.forEach(item => {
    if (item.classList.contains('completed')) {
      todoListArray.push({
        text: item.textContent,
        completed: true
      });
    } else {
      todoListArray.push({
        text: item.textContent,
        completed: false
      });
    }
  });
  localStorage.setItem('todoList', JSON.stringify(todoListArray));
}

window.addEventListener('load', () => {
  const todoListArray = JSON.parse(localStorage.getItem('todoList'));
  if (todoListArray) {
    todoListArray.forEach(item => {
      addToDo(item.text, item.completed);
    });
  }
});
