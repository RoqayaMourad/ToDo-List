//-------------selectors------------------------
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")


//------------------event listeners-----------------
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click' , filterTodo);


//---------------functions---------------------
//add todo 
function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();

    /*
todoList.innerHTML = `<div class="todo">
    <li class="todo-item"></li>
    <button class="check-btn"><i class="fa fa-check" aria-hidden="true"></i></button>
    <button class="trash-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
</div>` 
add it to addtodo function 
//why does it add only one element and how to loop it ?!
*/
var inputValue = todoInput.value;
if (inputValue === "") {
    alert("Please Enter a TODO");
    return false;
} else {

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //creat li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo)

    //create cheack button 
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    todoDiv.appendChild(checkButton);
    //add to localstorage 
    saveLocalTodos(todoInput.value);
    //create trash button 
    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    todoDiv.appendChild(trashButton);

    //append to list 
    todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value = "";
}
}
//delete or check
function deleteCheck(e){
    const item = e.target;
    //delete item 
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall")
        removeLocal(todo);
        //wait till the animation ends 
        todo.addEventListener('transitionend', function(){
             todo.remove();  
        })
    }

    //check
    if (item.classList[0] === "check-btn") {
        const todo = item.parentElement;
      todo.classList.toggle("checked");  
    }
}
//filter 
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){

            case "all":
            todo.style.display = 'flex';
            break;

            case "completed":
            if (todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;

            case "uncompleted":
            if (!todo.classList.contains('checked')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}

//save to localstorage function 
function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

//show the todos 
function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

   todos.forEach(function(todo){
       //show what was here, copy the content above and edit it 
       //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //creat li 
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo)
    //create cheack button 
    const checkButton = document.createElement('button');
    checkButton.classList.add("check-btn");
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    todoDiv.appendChild(checkButton);
    //create trash button 
    const trashButton = document.createElement('button');
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    todoDiv.appendChild(trashButton);
    //append to list 
    todoList.appendChild(todoDiv);
   })
}

//remove localstorage 
function removeLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos" , JSON.stringify(todos));
}