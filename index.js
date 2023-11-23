// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb://localhost:27017/draft';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Enable CORS
app.use(cors()); // Use the cors middleware

// Middleware
app.use(bodyParser.json());

// Define Task schema
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

// Define Task model
const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text, completed: false });
  await task.save();
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted successfully' });
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});