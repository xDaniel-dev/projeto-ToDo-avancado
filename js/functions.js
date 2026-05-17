function saveTodo(text) {

    const todo = document.createElement("div")
    todo.className = "todo"

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
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

}

function toggleForm() {
    todoForm.classList.toggle("hide")
    editForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
    toolbar.classList.toggle("hide")
}

function updateTodo(text) {
    const todos = document.querySelectorAll(".todo")

    todos.forEach(element => {
        let todoTitle = element.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    });
}

function searchTask() {
    const todos = document.querySelectorAll(".todo")
    const searchInputValue = searchInput.value.toLowerCase().trim()

    todos.forEach((element) => {

        const todoTitle = element.querySelector("h3").innerText.toLowerCase()

        if (todoTitle.includes(searchInputValue)) {
            element.classList.remove("hide")
        } else {
            element.classList.add("hide")
        }
    })

    searchInput.value = ""
}

function taskExists(text, ignoreOldValue = false) {
    const todos = document.querySelectorAll(".todo")

    return [...todos].some((element) => {
        const todoTitle = element.querySelector("h3").innerText

        if (ignoreOldValue) {
            return todoTitle === text && todoTitle !== oldInputValue
        }

        return todoTitle === text

    })
}