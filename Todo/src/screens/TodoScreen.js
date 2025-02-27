import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet 
} from "react-native";

const API_URL = "http://192.168.1.10:4000/todos"; // Replace with your API

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch tasks");
    }
  };

  const addOrEditTask = async () => {
    if (!input.trim()) return;

    try {
      if (editingTask) {
        await fetch(`${API_URL}/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: input }),
        });
        setTasks(tasks.map((task) => (task.id === editingTask.id ? { ...task, title: input } : task)));
        setEditingTask(null);
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: input }),
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
      setInput("");
    } catch (error) {
      Alert.alert("Error", "Failed to save task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete task");
    }
  };

  const startEditing = (task) => {
    setInput(task.title);
    setEditingTask(task);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Todo App</Text>

      {/* Input Section */}
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        placeholderTextColor="#aaa"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.button} onPress={addOrEditTask}>
        <Text style={styles.buttonText}>{editingTask ? "✏️ Update Task" : "➕ Add Task"}</Text>
      </TouchableOpacity>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => startEditing(item)} style={styles.editButton}>
                <Text style={styles.buttonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0C0F12" },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1BA94C" },
  input: {
    backgroundColor: "#1C1F23",
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1BA94C",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  taskContainer: {
    backgroundColor: "#1C1F23",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  taskTitle: { fontSize: 18, color: "#fff" },
  actions: { flexDirection: "row" },
  editButton: { backgroundColor: "#1BA94C", padding: 5, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: "#FF5252", padding: 5, borderRadius: 5 },
});
