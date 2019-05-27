//Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click', clearAllTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null)  {
     tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li Element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    //Append the link to li
    li.appendChild(link);
    
    //Append li to the ul
    taskList.appendChild(li); 
  });
}

//Add Task
function addTask(e) {
  if(taskInput.value === '')  {
    alert('Add a task');
  } else {
    
    //Create li Element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-times"></i>';
    //Append the link to li
    li.appendChild(link);
    
    //Append li to the ul
    taskList.appendChild(li); 

    //Store in local Storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = '';
    
    e.preventDefault();
  }
}  

//Store Task
function storeTaskInLocalStorage(task)  {
  let tasks;
  if(localStorage.getItem('tasks') === null)  {
     tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask (e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null)  {
     tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {  
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
function clearAllTasks() {

  //if the task list has an elements, it loops through and removes the first child until there are none.
  while(taskList.firstChild)  {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear tasks from Local Storage
  clearTasksFromLocalStorage();
}

//Clear tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  //querySelector returns a node list which allows us to use the forEach method
document.querySelectorAll('.collection-item').forEach
(function(task){
    const item = task.firstChild.textContent;
    //-1 appears if you fail to find
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
} 