document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save to Local Storage again
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    if (taskText.trim() === "") {
      alert("Please enter a task!"); // Alert if input is empty
      return;
    }

    // Create a new task item (li)
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a remove button for the task
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn'); // Use classList.add

    // Add event listener to remove the task when button is clicked
    removeButton.addEventListener('click', () => {
      taskList.removeChild(listItem);
      removeTaskFromStorage(taskText); // Remove from Local Storage
    });

    // Append the remove button to the task item and add it to the list
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Save to Local Storage if necessary
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Clear the input field
    taskInput.value = "";
  }

  // Function to remove task from Local Storage
  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText); // Add the task and save it to Local Storage
  });

  // Add event listener to the input field for the "Enter" key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText); // Add the task and save it to Local Storage
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
