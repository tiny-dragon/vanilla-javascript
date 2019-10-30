const todoForm = document.querySelector('.js-todo-form')
const todoInput = todoForm.querySelector('input')
const todoList = document.querySelector('.js-todo-list')

const TODOS_LS = 'todos'

let todos = []

function deleteTodo(e) {
    const button = e.target;
    const li = button.parentNode;

    todoList.removeChild(li)

    const cleanTodos = todos.filter(function(todo) {
        return todo.id !== parseInt(li.id)
    })

    todos = cleanTodos
    saveTodos()
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos))
}

function paintTodo(text) {
    const li = document.createElement('li')
    const delButton = document.createElement('button')
    const span = document.createElement('span')
    const newId = todos.length

    delButton.innerText = 'Delete'
    delButton.addEventListener('click', deleteTodo)
    span.innerText = text
    li.appendChild(span)
    li.appendChild(delButton)
    li.id = newId

    todoList.appendChild(li)

    const todoObj = {
        id: newId,
        text: text
    }

    todos.push(todoObj)
    saveTodos()
}

function handleToDosSubmit(e) {
    e.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue)
    todoInput.value = ''
}

function loadToDos() {
    const loadedTodos = localStorage.getItem(TODOS_LS)

    if (loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos)
        parsedTodos.forEach(function(todo) {
            paintTodo(todo.text)
        });
    }
}

function init() {
    loadToDos()
    todoForm.addEventListener('submit', handleToDosSubmit)
}

init()