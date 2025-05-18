import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (editingId) {
        const response = await axios.patch(`${API_URL}/api/tasks/${editingId}`, {
          title,
          description
        });
        setTasks(tasks.map(task => task.id === editingId ? response.data : task));
      } else {
        const response = await axios.post(`${API_URL}/api/tasks`, {
          title,
          description,
          completed: false
        });
        setTasks([...tasks, response.data]);
      }
      setTitle('');
      setDescription('');
      setEditingId(null);
    } catch (err) {
      setError(editingId ? 'Failed to update task' : 'Failed to add task');
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${API_URL}/api/tasks/${id}`, {
        completed: !currentStatus
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setDescription(task.description || '');
    setEditingId(task.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
        />
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => {
                setTitle('');
                setDescription('');
                setEditingId(null);
                setError(null);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading && tasks.length === 0 ? (
        <p className="loading-message">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one above!</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <small>
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="task-actions">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id, task.completed)}
                  className="complete-checkbox"
                />
                <button 
                  onClick={() => editTask(task)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;