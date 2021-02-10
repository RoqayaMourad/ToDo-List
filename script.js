//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)

/*
   todoList.innerHTML = `<div class="todo">
    <li class="todo-item"></li>
    <button class="check-btn"><i class="fa fa-check" aria-hidden="true"></i></button>
    <button class="trash-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
</div>` 
//why does it add only one element and how to loop it ?!
*/

//functions
function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();

    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //creat li 
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
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

    //clear input value
    todoInput.value="";
}
function deleteCheck(e){
    console.log(e.target)
    
}