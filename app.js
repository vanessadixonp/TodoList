const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners('click', clearTasks)

function loadEventListeners() {
    form.addEventListener('submit', addTask)
    //dom load event 
    document.addEventListener('DOMContentLoaded',getTasks)
    //remove task events
    taskList.addEventListener('click', removeTask)

    clearBtn.addEventListener('click', clearTasks)

    filter.addEventListener('keyup', filterTask)
}

///get task from ls
function getTasks() {
    
    let task = JSON.parse(localStorage.getItem('tasks')) || [];

    task.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        
        li.appendChild(document.createTextNode(task));
        
        //create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)
        
        taskList.appendChild(li);

    })
}

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');    }
        e.preventDefault();
        const li = document.createElement('li');
        li.className = 'collection-item';
        
        li.appendChild(document.createTextNode(taskInput.value));
        
        //create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)
        
        taskList.appendChild(li);

        //store in the local storage
        storeTaskInLocalStorage(taskInput.value)
        
      form.reset();
} 

function storeTaskInLocalStorage(tasks) {

    let task = JSON.parse(localStorage.getItem('tasks')) || [];

    task.push(tasks)
    localStorage.setItem('tasks',JSON.stringify(task))
}
//remove task
function removeTask(e) {
    console.log(e.target)
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove()

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
       

    }
}

function removeTaskFromLocalStorage(taskItem){
    let task = JSON.parse(localStorage.getItem('tasks')) || [];

    localStorage.setItem('tasks',JSON.stringify(task))

    task.forEach((tasks,index) => {
        if(taskItem.textContent == tasks)
        task.splice(index,1)
    })

    localStorage.setItem('tasks', JSON.stringify(task))

}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
    localStorage.clear()
}


function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text ) !== -1) {
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    })
}