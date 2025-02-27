import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function RegisterScreen({ navigate }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.10:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("Registration successful! Please login.");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your network.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🧑</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.icon}>📧</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigate("Login")}>
          Login here
        </Text>
      </Text>
    </View>
  );
}

// ✅ Updated Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1e21",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  icon: {
    fontSize: 18,
    color: "#fff",
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    height: 50,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
  },
  loginLink: {
    color: "#4caf50",
    fontWeight: "bold",
  },
});

