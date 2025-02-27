"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };

  // Add or edit a task
  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    try {
      let response;
      if (editingTask) {
        response = await axios.put(`${API_URL}/todos/${editingTask.id}`, { title: input });
        setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
      } else {
        response = await axios.post(`${API_URL}/todos`, { title: input });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setInput("");
    } catch (error) {
      console.error("Error saving task:", error.response?.data || error.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  // Set task for editing
  const editTask = (task) => {
    setEditingTask(task);
    setInput(task.title);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#ffffff",
        p: 3,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 500, boxShadow: 4, p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
          Todo App
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            fullWidth
            variant="outlined"
            sx={{ bgcolor: "#f8f9fa", borderRadius: "8px" }}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            {editingTask ? "Update" : "Add"}
          </Button>
        </Box>
        <Box>
          {tasks.map((task) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  bgcolor: "#f8f9fa",
                  mb: 2,
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography>{task.title}</Typography>
                </CardContent>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton onClick={() => editTask(task)} sx={{ color: "#f39c12" }}>
                    <Edit fontSize="large" />
                  </IconButton>
                  <IconButton onClick={() => deleteTask(task.id)} sx={{ color: "#dc3545" }}>
                    <Delete fontSize="large" />
                  </IconButton>
                </Box>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
