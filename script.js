    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        alert('Please enter a task!');
        return;
      }

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;

      // Mark task as completed
      li.querySelector('span').addEventListener('click', function () {
        this.classList.toggle('completed');
      });

      // Delete task
      li.querySelector('.delete-btn').addEventListener('click', function () {
        taskList.removeChild(li);
      });

      taskList.appendChild(li);
      taskInput.value = '';
    });
 