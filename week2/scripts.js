document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');

    const taskItem = createTaskElement(taskText, dueDate);

    taskList.appendChild(taskItem);
    taskInput.value = '';
    dueDateInput.value = '';
    taskInput.focus();

    saveTasksToLocalStorage();
}

function createTaskElement(taskText, dueDate) {
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.textContent = `${taskText} (Due: ${dueDate})`;
    taskContent.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function() {
        editTask(taskItem, taskText, dueDate);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasksToLocalStorage();
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

function editTask(taskItem, oldTaskText, oldDueDate) {
    const newTaskText = prompt('Edit your task:', oldTaskText);
    const newDueDate = prompt('Edit your due date:', oldDueDate);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.querySelector('span').textContent = `${newTaskText} (Due: ${newDueDate})`;
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text.split(' (Due: ')[0], task.text.split(' (Due: ')[1].slice(0, -1));
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        document.getElementById('taskList').appendChild(taskItem);
    });
}
