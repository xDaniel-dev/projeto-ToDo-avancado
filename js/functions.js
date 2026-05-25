import { 
    todoForm,
    editForm,
    todoList,
    toolbar,
    searchInput
} from "./variaveis.js"

let todos = []

export function getTodoState(){
    return todos
}

export function renderTodos(filterTodos = todos){

    todoList.innerHTML = ""

    filterTodos.forEach((element)=>{
        const todoEl = document.createElement("div")

        todoEl.className = "todo"
        todoEl.dataset.id = element.id

        if(element.done){
            todoEl.classList.add("done")
        }

        todoEl.innerHTML = `
            <h3>${element.text}</h3>
            
            <button class="finish-todo">
                <i class="bi bi-check2"></i>
            </button>
            
            <button class="edit-todo">
                <i class="bi bi-pencil-square"></i>
            </button>

            <button class="remove-todo">
                <i class="bi bi-trash"></i>
            </button>
        `

        todoList.appendChild(todoEl)
    })

}
export function saveTodo(text) {

    todos.push({
        id:Date.now().toString(),
        text,
        done: false
    })

    saveTodoLocalStorage()
    renderTodos()
}

export function saveTodoLocalStorage(){

    localStorage.setItem("todos",JSON.stringify(todos))

}

export function loadTodos(){
    
     todos = JSON.parse(localStorage.getItem("todos")) || []

    renderTodos()

}

export function toggleForm() {
    todoForm.classList.toggle("hide")
    editForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
    toolbar.classList.toggle("hide")
}

export function updateTodo(text) {

    todos = todos.map((todo)=>{
        if(todo.id === oldTodoId){
            return{
                ...todo,
                text
            }
        }

        return todo

    })

    saveTodoLocalStorage()
    renderTodos()
}

export function removeTodo(id){
    todos = todos.filter((todo)=>{
        return todo.id !== id
    })

    saveTodoLocalStorage()
    renderTodos()
}

export function toggleDone(id){
    todos = todos.map((todo)=>{
        if(todo.id === id){
            return {
                ...todo,
                done: !todo.done
            }
        }
        return todo
    })

    saveTodoLocalStorage()
    renderTodos()

}

export function searchTask(value = "") {
   
    const filterTodos = todos.filter((todo)=>{
    return todo.text.toLowerCase().includes(value.toLowerCase())
   })

   renderTodos(filterTodos)
}

export function taskExists(text, ignoreOldValue = false) {

    return todos.some((todo)=>{
        if(ignoreOldValue){
            return todo.text === text && todo.id !== oldTodoId
        }

        return todo.text === text
    })
   
}

let oldTodoId = null

export function setOldTodoId(id){
    oldTodoId = id
}

