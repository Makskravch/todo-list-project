// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const todoFilter = document.querySelector('.todo-filter')

// Event Listeners
// document.addEventListener('DOMContentLoaded', renderTodos)
document.addEventListener('DOMContentLoaded', getLocalTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
todoFilter.addEventListener('click', filter)

// Functions
function addTodo(e) {
  e.preventDefault()
  if (todoInput.value.trim().length == 0) {
    todoInput.value = ''
    return
  }
  // Create list item
  let item = document.createElement('li')
  item.classList.add('todo-item')
  // Create paragraph
  let text = document.createElement('p')
  text.classList.add('todo-text')
  text.innerText = todoInput.value
  item.append(text)
  // Save todo item to LocalStorage
  saveLocalTodos(todoInput.value)
  // Create complete btn
  let completeBtn = document.createElement('button')
  completeBtn.classList.add('complete-btn')
  item.append(completeBtn)
  // Create complete btn icon
  let completeBtnIcon = document.createElement('i')
  completeBtnIcon.classList.add('fas')
  completeBtnIcon.classList.add('fa-check')
  completeBtn.append(completeBtnIcon)
  // Create trash btn
  let trashBtn = document.createElement('button')
  trashBtn.classList.add('trash-btn')
  item.append(trashBtn)
  // Create trash btn icon
  let trashBtnIcon = document.createElement('i')
  trashBtnIcon.classList.add('fas')
  trashBtnIcon.classList.add('fa-trash')
  trashBtn.append(trashBtnIcon)
  // Append item to list
  todoList.append(item)
  // Clear input
  todoInput.value = ''
}

function deleteCheck(e) {
  const target = e.target
  const item = target.parentElement
  // Delete item
  if (target.classList.contains('trash-btn')) {
    item.classList.add('fall')
    item.addEventListener('transitionend', function (e) {
      if (e.propertyName == "transform") {
        this.remove()
        removeLocalTodos(this.firstChild.innerText)
      }
    })
  }

  // Check mark
  if (target.classList.contains('complete-btn')) {
    item.classList.toggle('is-completed')
  }
}

function filter() {
  const todos = todoList.childNodes
  todos.forEach(todo => {
    switch (this.value) {
      case 'all':
        todo.style.display = 'flex'
        break;

      case 'completed':
        if (todo.classList.contains('is-completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('is-completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getLocalTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(todo => {
    // Create list item
    let item = document.createElement('li')
    item.classList.add('todo-item')
    // Create paragraph
    let text = document.createElement('p')
    text.classList.add('todo-text')
    text.innerText = todo
    item.append(text)
    // Create complete btn
    let completeBtn = document.createElement('button')
    completeBtn.classList.add('complete-btn')
    item.append(completeBtn)
    // Create complete btn icon
    let completeBtnIcon = document.createElement('i')
    completeBtnIcon.classList.add('fas')
    completeBtnIcon.classList.add('fa-check')
    completeBtn.append(completeBtnIcon)
    // Create trash btn
    let trashBtn = document.createElement('button')
    trashBtn.classList.add('trash-btn')
    item.append(trashBtn)
    // Create trash btn icon
    let trashBtnIcon = document.createElement('i')
    trashBtnIcon.classList.add('fas')
    trashBtnIcon.classList.add('fa-trash')
    trashBtn.append(trashBtnIcon)
    // Append item to list
    todoList.append(item)
  });
}

function removeLocalTodos(todoText) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  const todosIndex = todos.indexOf(todoText)
  todos.splice(todosIndex, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}
