// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const todoArr = []

// Event Listeners
// document.addEventListener('DOMContentLoaded', renderTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

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
      }
    })
  }

  // Check mark
  if (target.classList.contains('complete-btn')) {
    item.classList.toggle('is-completed')
  }
}
