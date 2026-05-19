const API = 'http://localhost:5000/tasks';

async function fetchTasks(){

    const response = await fetch(API);

    const tasks = await response.json();

    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';

    tasks.reverse().forEach(task => {

        const li = document.createElement('li');

    li.innerHTML = `
    <div style="
        text-decoration: ${task.completed ? 'line-through' : 'none'};
        opacity: ${task.completed ? '0.6' : '1'};
        font-size: 18px;
        margin-bottom: 10px;
    ">
        📌 ${task.name}
    </div>

    <div style="
        text-decoration: ${task.completed ? 'line-through' : 'none'};
        opacity: ${task.completed ? '0.6' : '1'};
        margin-bottom: 10px;
    ">
        ${task.description}
    </div>

    <button onclick="completeTask('${task._id}')">
        ${task.completed ? '✅ Completed' : 'Mark Complete'}
    </button>

    <button
        class="delete-btn"
        onclick="deleteTask('${task._id}')"
    >
        Delete Task
    </button>
`;

        taskList.appendChild(li);
    });
}

async function addTask(){

    const name = document.getElementById('taskName').value;

    const description = document.getElementById('taskDesc').value;

    if(name === '' || description === ''){
        alert('Please fill all fields');
        return;
    }

    await fetch(API,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,
            description
        })
    });

    document.getElementById('taskName').value = '';

    document.getElementById('taskDesc').value = '';

    fetchTasks();
}

async function deleteTask(id){

    await fetch(`${API}/${id}`,{
        method:'DELETE'
    });

    fetchTasks();
}

async function completeTask(id){
    const response = await fetch(`${API}/${id}`,
    {
        method: 'PUT'
    });
    const data = await response.json();
    console.log(data);

fetchTasks();
}

fetchTasks();