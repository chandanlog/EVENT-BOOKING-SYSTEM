import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, Modal 
} from "react-native";

const API_URL = "http://192.168.1.10:4000/todos"; // Replace with your API

export default function HomeScreen(navigate) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  const openDeleteModal = (task) => {
    setTaskToDelete(task);
    setModalVisible(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setModalVisible(false);
  };

  const confirmDeleteTask = async () => {
    try {
      await fetch(`${API_URL}/${taskToDelete.id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      closeDeleteModal();
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
      <Text style={styles.title}>Todo App</Text>

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
              <TouchableOpacity onPress={() => openDeleteModal(item)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>🗑</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={closeDeleteModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to delete this task?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeDeleteModal} style={styles.modalButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDeleteTask} style={styles.modalButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#1C1F23",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { marginHorizontal: 5 },
});
