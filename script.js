document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
      const taskText = taskInput.value.trim(); // Get and trim the input value

      if (taskText === "") {
          alert("Please enter a task!"); // Alert if input is empty
          return;
      }

      // Create a new task item (li)
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      // Create a remove button for the task
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.className = 'remove-btn';

      // Add event listener to remove the task when button is clicked
      removeButton.onclick = () => {
          taskList.removeChild(listItem);
      };

      // Append the remove button to the task item and add it to the list
      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);

      // Clear the input field
      taskInput.value = "";
  }

  // Add event listener to the "Add Task" button
  addButton.addEventListener('click', addTask);

  // Add event listener to the input field for the "Enter" key
  taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTask();
      }
  });
});
