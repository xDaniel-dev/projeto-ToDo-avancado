import {
    todoForm,
    editForm,
    cancelEditBtn,
    filterSelect,
    todoInput,
    editInput,
    searchInput
} from "./variaveis.js"


import {
    saveTodo,
    toggleForm,
    updateTodo,
    searchTask,
    taskExists,
    setOldTodoId,
    saveTodoLocalStorage,
    loadTodos,
    getTodoState,
    toggleDone,
    removeTodo,
    renderTodos
} from "./functions.js"

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value.toLowerCase().trim()
    if (inputValue) {
        if (taskExists(inputValue)) {
            alert("Tarefa já registrada !!!")
        } else {
            saveTodo(inputValue)
        }
    }

    todoInput.value = ""
    todoInput.focus()

})

document.addEventListener("click", (e) => {
    
    const button = e.target.closest("button")

    if(!button) return

    const parentEl = button.closest(".todo")
    
    const id = parentEl.dataset.id

    if (button.classList.contains("finish-todo")) {
        toggleDone(id)
    }
    if (button.classList.contains("remove-todo")) {
        removeTodo(id)
    }
    if (button.classList.contains("edit-todo")) {
        toggleForm()
        editInput.value = parentEl.querySelector("h3").textContent
        setOldTodoId(id)
    }
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value.toLowerCase().trim()
    if (editInputValue) {
        if (taskExists(editInputValue, true)) {
            alert("Essa tarefa já existe !!!")
        } else {
            updateTodo(editInputValue)
        }
    }

    toggleForm()
})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()
    toggleForm()
})


filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value
    const todos = getTodoState()
    
    let filteredTodos = []

        switch (filterValue) {
            case "all":
                filteredTodos = todos
                break

            case "done":
                filteredTodos = todos.filter(todo => todo.done)
                break
            case "todo":
                
                filteredTodos = todos.filter(todo => !todo.done)
                break
        }

        renderTodos(filteredTodos)
    })



searchInput.addEventListener("input",(e)=>{

    searchTask(e.target.value)
})

loadTodos()