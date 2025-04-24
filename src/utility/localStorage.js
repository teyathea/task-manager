// Get stored users from localStorage
export const getStoredUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || {};
};

// Store users in localStorage
export const storeUser = (user) => {
  let users = getStoredUsers();
  users[user.username] = { password: user.password, tasks: [] };
  localStorage.setItem("users", JSON.stringify(users));
};

// Get the currently logged-in user
export const getStoredUser = () => {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
};

// Store the currently logged-in user
export const storeCurrentUser = (username) => {
  localStorage.setItem("currentUser", JSON.stringify(username));
};

// Clear the currently logged-in user
export const clearStoredUser = () => {
  localStorage.removeItem("currentUser");
};

// Function to store a new task for the current user
export const storeTask = (username, newTask) => {
  let users = getStoredUsers();
  if (!users[username]) return;

  // Check if the task already exists in the user's task list
  const existingTasks = users[username].tasks;
  if (existingTasks.some(task => task.id === newTask.id)) {
    return;
  }

  // Add the new task to the user's task list
  users[username].tasks.push(newTask);

  // Save updated user tasks back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
};

// Get tasks for the current logged-in user
export const getTasksForUser = (username) => {
  let users = getStoredUsers();
  return users[username] ? users[username].tasks : [];
};

// Function to update a task for the current user
export const updateTask = (username, updatedTask) => {
  let users = getStoredUsers();
  if (!users[username]) return;

  // Update the task in the user's task list
  const tasks = users[username].tasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );

  // Save updated tasks back to localStorage
  users[username].tasks = tasks;
  localStorage.setItem("users", JSON.stringify(users));
};

// Function to remove a task for the current user
export const removeTask = (username, taskId) => {
  let users = getStoredUsers();
  if (!users[username]) return;

  // Filter out the task to be deleted
  users[username].tasks = users[username].tasks.filter(task => task.id !== taskId);

  // Save updated tasks back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
};

// Add deleteUserFromStorage function to delete a user
export const deleteUserFromStorage = (username) => {
  let users = getStoredUsers();
  delete users[username];
  localStorage.setItem("users", JSON.stringify(users));
};