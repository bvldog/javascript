const todoForm = document.querySelector('.todoForm'),
        todoInput = todoForm.querySelector('input'),
        todoList = document.querySelector('.todoList');



const TODOS_LS = "todos";
const idNumbers = 1;
let todos = [];
let doneTodos = [];

function loadTodos() {
        const loadedTodos = localStorage.getItem(TODOS_LS); 
        if(loadedTodos !== null) {
                const parseTodos = JSON.parse(loadedTodos);
                console.log("parse loaded todos", parseTodos);
                parseTodos.forEach(function(todo) {
                    addTodoList(todo.text);
                });

        }
}
function doneBtnHandler(e){
        console.log("click done");
        const btn = e.target; 
        const li = btn.parentNode;
        li.classList.add("done");
        saveToLS();
}

function removeHandler(e){
        const btn = e.target; 
        const li = btn.parentNode; 
        todoList.removeChild(li);
        
        const clearTodos = todos.filter(function(todo) {
                console.log(todo.id, li.id)
                return todo.id !== parseInt(li.id);
        });
        console.log("remove", clearTodos);
        doneTodos.push(clearTodos);
        console.log("done todos", doneTodos);
        todos = clearTodos;
        saveToLS();
}

function saveToLS() { 
        console.log("save todos", todos);
        localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function addTodoList(text) { 
        console.log("runaddtodolsit:");
        const li = document.createElement('li');
        const span = document.createElement('span');
        const delBtn = document.createElement('button'); 
        const doneBtn = document.createElement('button'); 
        const idNumbers = todos.length + 1;
        li.id = idNumbers;
        delBtn.innerText = "x";
        doneBtn.innerText = "done";
        span.innerText = text;
        li.appendChild(span); 
        li.appendChild(delBtn);
        li.appendChild(doneBtn);
        todoList.appendChild(li); 
        const todoObj = {
                text: text,
                id: idNumbers 
        }
        todos.push(todoObj); 
        delBtn.addEventListener("mouseup", removeHandler);
        doneBtn.addEventListener("click", doneBtnHandler);
        todoInput.value = "";
        saveToLS();
}

function todoInputHandler(e){
        e.preventDefault();
        const currentInputValue = todoInput.value; 
        if(currentInputValue){
        addTodoList(currentInputValue);
        } else {
        }
}

function init() {
        loadTodos();
        if(todoInput){ 
            todoForm.addEventListener("submit", todoInputHandler);
        } else {
                console.log("todoInput value =", todoInput.value);
        }
}
init();

