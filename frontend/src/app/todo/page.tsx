"use client"
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Modal, Box, IconButton, List, ListItem, ListItemText, Snackbar, Card, CardContent, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://192.168.1.10:4000/todos'; // Replace with your API

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setAlertMessage('Failed to fetch tasks');
      setAlertOpen(true);
    }
  };

  const addOrEditTask = async () => {
    if (!input.trim()) return;

    try {
      if (editingTask) {
        await fetch(`${API_URL}/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: input }),
        });
        setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...task, title: input } : task)));
        setEditingTask(null);
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: input }),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
      setInput('');
    } catch (error) {
      setAlertMessage('Failed to save task');
      setAlertOpen(true);
    }
  };

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setModalOpen(false);
  };

  const confirmDeleteTask = async () => {
    try {
      await fetch(`${API_URL}/${taskToDelete.id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      closeDeleteModal();
    } catch (error) {
      setAlertMessage('Failed to delete task');
      setAlertOpen(true);
    }
  };

  const startEditing = (task) => {
    setInput(task.title);
    setEditingTask(task);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={{
      padding: 3, backgroundColor: '#171a1d', minHeight: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      <Box sx={{ maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" color="success.main" textAlign="center" gutterBottom>
          Todo App
        </Typography>

        <Card sx={{
          backgroundColor: '#2c353d', padding: 3, borderRadius: 2, boxShadow: 3
        }}>
          <CardContent>
            <TextField
              fullWidth
              label="Enter Task"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                backgroundColor: '#1f262e', marginBottom: 2, color: '#fff',
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#fff' } // Label color set to white
              }}
              InputProps={{
                style: { color: '#fff' }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={addOrEditTask}
              sx={{
                marginBottom: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' }
              }}
            >
              {editingTask ? '✏️ Update Task' : '➕ Add Task'}
            </Button>
          </CardContent>
        </Card>

        <Box sx={{ marginTop: 3 }}>
          <List>
            {tasks.map((task) => (
              <Card sx={{
                marginBottom: 2, backgroundColor: '#2c353d', borderRadius: 2, boxShadow: 3
              }} key={task.id}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText
                    primary={task.title}
                    primaryTypographyProps={{ style: { color: '#fff' } }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => startEditing(task)} sx={{ color: '#1BA94C' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDeleteModal(task)} sx={{ color: '#FF5252' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>

        <Modal open={modalOpen} onClose={closeDeleteModal} aria-labelledby="modal-title">
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            backgroundColor: '#2c353d', padding: 3, borderRadius: 2, width: 300
          }}>
            <Typography variant="h6" color="white" mb={2} id="modal-title">
              Are you sure you want to delete this task?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={closeDeleteModal} sx={{ color: '#fff' }}>Cancel</Button>
              <Button onClick={confirmDeleteTask} sx={{ color: '#FF5252' }}>Delete</Button>
            </Box>
          </Box>
        </Modal>

        {/* Snackbar for alerts */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          message={alertMessage}
          sx={{ backgroundColor: '#FF5252', color: '#fff' }}
        />
      </Box>
    </Box>
  );
}
