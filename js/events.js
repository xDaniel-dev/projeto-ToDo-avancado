import {
    todoForm,
    editForm,
    cancelEditBtn,
    filterSelect,
    eraseBtn,
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
    setOldInputValue
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
    const targetEl = e.target
    const parentEl = targetEl.closest(".todo")
    let todoTitle

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").textContent
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }
    if (targetEl.classList.contains("edit-todo")) {
        toggleForm()
        editInput.value = todoTitle
        setOldInputValue(todoTitle)
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
    const todos = document.querySelectorAll(".todo")

    todos.forEach((element) => {
        switch (filterValue) {
            case "all":
                element.classList.remove("hide")
                break

            case "done":
                if (element.classList.contains("done")) {
                    element.classList.remove("hide")
                } else {
                    element.classList.add("hide")
                }
                break
            case "todo":
                if (!element.classList.contains("done")) {
                    element.classList.remove("hide")
                } else {
                    element.classList.add("hide")
                }
                break
        }
    })
})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchTask()
    searchInput.focus()
})

