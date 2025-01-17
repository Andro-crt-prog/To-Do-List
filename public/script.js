document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const notesTextarea = document.getElementById('notes');
    const rememberTextarea = document.getElementById('rememberFocus');
    const saveNotesBtn = document.getElementById('saveNotesBtn');
    const saveRememberBtn = document.getElementById('saveRememberBtn');

    // Load saved notes and remember text from local storage
    notesTextarea.value = localStorage.getItem('notes') || '';
    rememberTextarea.value = localStorage.getItem('remember') || '';

    // Save notes to local storage
    saveNotesBtn.addEventListener('click', () => {
        localStorage.setItem('notes', notesTextarea.value);
        alert('Notes saved!');
        displaySavedContent('notes', notesTextarea.value);
    });

    // Save remember text to local storage
    saveRememberBtn.addEventListener('click', () => {
        localStorage.setItem('remember', rememberTextarea.value);
        alert('Remember & Focus saved!');
        displaySavedContent('remember', rememberTextarea.value);
    });

    // Function to display saved content
    function displaySavedContent(type, content) {
        const displayElement = document.getElementById(`${type}Display`);
        if (displayElement) {
            displayElement.textContent = content;
        }
    }

    // Fetch tasks from the server
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                if (task.title !== 'Sample Task') { // Hide the sample task
                    addTaskToDOM(task);
                }
            });
        });

    // Add task to the server
    addTaskBtn.addEventListener('click', () => {
        const task = {
            id: Date.now(),
            title: taskInput.value,
            completed: false
        };
        if (task.title) {
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            .then(response => {
                if (response.status === 201) {
                    addTaskToDOM(task);
                    taskInput.value = '';
                }
            });
        }
    });

    // Function to add task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.title;
        taskText.classList.toggle('completed', task.completed);
        li.dataset.id = task.id;

        // Toggle task completion on click
        taskText.addEventListener('click', () => {
            task.completed = !task.completed;
            fetch(`/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            .then(response => {
                if (response.status === 200) {
                    taskText.classList.toggle('completed', task.completed);
                }
            });
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;'; // Use the cross icon
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from toggling completion
            fetch(`/tasks/${task.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 200) {
                    li.remove();
                }
            });
        });

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});