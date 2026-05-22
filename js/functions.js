import { 
    todoForm,
    editForm,
    todoList,
    toolbar,
    searchInput
} from "./variaveis.js"


export function saveTodo(text, done = false , save = true) {

    const todo = document.createElement("div")
    todo.className = "todo"

    if(done){
        todo.classList.add("done")
    }

    const todoTitle = document.createElement("h3")
    todoTitle.textContent = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.className = "finish-todo"
    doneBtn.innerHTML = '<i class="bi bi-check2"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.className = "edit-todo"
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.className = "remove-todo"
    removeBtn.innerHTML = '<i class="bi bi-trash"></i>'
    todo.appendChild(removeBtn)

    todoList.appendChild(todo)

    if(save){
        saveTodoLocalStorage()
    }

}

export function saveTodoLocalStorage(){
    const todos = []

    document.querySelectorAll(".todo").forEach((element)=>{
        todos.push({
            text: element.querySelector("h3").textContent,
            done: element.classList.contains("done")
        })
    })

    localStorage.setItem("todos",JSON.stringify(todos))
}

export function loadTodos(){
    
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    todos.forEach((element)=>{
        saveTodo(element.text,element.done,false)
    })

}

export function toggleForm() {
    todoForm.classList.toggle("hide")
    editForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
    toolbar.classList.toggle("hide")
}

export function updateTodo(text) {
    const todos = document.querySelectorAll(".todo")

    todos.forEach(element => {
        let todoTitle = element.querySelector("h3")

        if (todoTitle.textContent === oldInputValue) {
            todoTitle.textContent = text
        }
    });
}

export function searchTask() {
    const todos = document.querySelectorAll(".todo")
    const searchInputValue = searchInput.value.toLowerCase().trim()

    todos.forEach((element) => {

        const todoTitle = element.querySelector("h3").textContent.toLowerCase().trim()

        if (todoTitle.includes(searchInputValue)) {
            element.classList.remove("hide")
        } else {
            element.classList.add("hide")
        }
    })

    searchInput.value = ""
}

export function taskExists(text, ignoreOldValue = false) {
    const todos = document.querySelectorAll(".todo")

    return [...todos].some((element) => {
        const todoTitle = element.querySelector("h3").textContent

        if (ignoreOldValue) {
            return todoTitle === text && todoTitle !== oldInputValue
        }

        return todoTitle === text

    })
}

let oldInputValue = ""

export function setOldInputValue(value) {
    oldInputValue = value
}