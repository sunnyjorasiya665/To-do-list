document.addEventListener("DOMContentLoaded", function() {
    // Function to create a new task with subtasks
    function createTask(taskName) {
        var listItem = document.createElement("li"); // Create a new list item for the task
        listItem.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${taskName}</span>
            <input type="text" class="subtask-input" placeholder="Enter subtask...">
            <button class="add-subtask-btn">Add Subtask</button>
            <ul class="subtasks"></ul>`; // Include checkboxes, task name, input field for subtask, and button to add subtask
        document.getElementById("list-container").appendChild(listItem); // Append the new task to the list
    }

    // Function to add subtasks to a task
    function addSubtask(taskItem, subtaskName) {
        var subtasksList = taskItem.querySelector(".subtasks"); // Get the subtasks list for the task
        var subtaskItem = document.createElement("li"); // Create a new list item for the subtask
        subtaskItem.innerHTML = `
            <input type="checkbox" class="subtask-checkbox">
            <span>${subtaskName}</span>`; // Include checkbox and subtask name
        subtasksList.appendChild(subtaskItem); // Append the new subtask to the subtasks list
    }

    // Event listener for the "Add Task" button click
    document.getElementById("btn").addEventListener("click", function() {
        var taskInput = document.getElementById("taskInput");
        var taskName = taskInput.value.trim(); // Get the value from the task input field
        if (taskName !== "") { // Check if the input is not empty
            createTask(taskName); // Create a new task
            taskInput.value = ""; // Clear the task input field
        } else {
            alert("Please enter a valid task!"); // Alert the user if the input is empty
        }
    });

    // Event delegation for dynamically added elements
    document.getElementById("list-container").addEventListener("click", function(event) {
        var target = event.target;
        if (target.classList.contains("add-subtask-btn")) { // If the clicked element is "Add Subtask" button
            var taskItem = target.closest("li"); // Find the closest parent <li> element
            var subtaskInput = taskItem.querySelector(".subtask-input");
            var subtaskName = subtaskInput.value.trim(); // Get the value from the subtask input field
            if (subtaskName !== "") { // Check if the input is not empty
                addSubtask(taskItem, subtaskName); // Add a new subtask to the task
                subtaskInput.value = ""; // Clear the subtask input field
            } else {
                alert("Please enter a valid subtask!"); // Alert the user if the input is empty
            }
        } else if (target.classList.contains("task-checkbox")) { // If the clicked element is a task checkbox
            var subtaskCheckboxes = target.closest("li").querySelectorAll(".subtask-checkbox");
            subtaskCheckboxes.forEach(function(checkbox) {
                checkbox.checked = target.checked; // Set all subtask checkboxes to the state of the task checkbox
            });
        } else if (target.classList.contains("subtask-checkbox")) { // If the clicked element is a subtask checkbox
            var taskCheckbox = target.closest("li").querySelector(".task-checkbox");
            var subtaskCheckboxes = target.closest(".subtasks").querySelectorAll(".subtask-checkbox");
            var allChecked = true;
            subtaskCheckboxes.forEach(function(checkbox) {
                if (!checkbox.checked) {
                    allChecked = false; // Check if all subtask checkboxes are checked
                }
            });
            taskCheckbox.checked = allChecked; // Set task checkbox based on the state of subtask checkboxes
        }
    });
});
