// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
useEffect(() => {
  // Fetch tasks from the backend
  axios.get('http://localhost:3001/api/tasks').then((response) => {
    setTasks(response.data);
  });
}, []);

const addTask = () => {
  // Send a POST request to add a new task
  axios.post('http://localhost:3001/api/tasks', { text: newTask }).then((response) => {
    setTasks([...tasks, response.data]);
    setNewTask('');
  });
};

const deleteTask = (id) => {
  // Send a DELETE request to remove a task
  axios.delete(http://localhost:3001/api/tasks/${id}).then(() => {
    setTasks(tasks.filter((task) => task._id !== id));
  });
};

const toggleTask = (id) => {
  // Send a PUT request to toggle the completion status of a task
  axios.put(http://localhost:3001/api/tasks/${id}).then((response) => {
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, completed: response.data.completed } : task
      )
    );
  });
};

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleTask(task._id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default App;