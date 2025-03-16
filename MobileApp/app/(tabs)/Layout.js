import React, { useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Layout({ navigate, isLoggedIn, setIsLoggedIn, children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("Home"); // Redirect to Home
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo} onPress={() => navigate("Home")}>
          EventHub
        </Text>

        <View style={styles.navbar}>
          <NavButton title="Home" onPress={() => navigate("Home")} />
          <NavButton title="ToDo" onPress={() => navigate("ToDo")} />

          {!isLoggedIn ? (
            <NavButton title="Login" onPress={() => navigate("Login")} />
          ) : (
            <View style={styles.profileContainer}>
              {/* Profile Icon */}
              <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                <Text style={styles.profileIcon}>👤</Text>
              </TouchableOpacity>

              {/* Dropdown Menu */}
              {showDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={handleLogout} style={styles.dropdownItem}>
                    <Text style={styles.dropdownText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 EventHub. All Rights Reserved.</Text>
      </View>
    </View>
  );
}

const NavButton = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} color="#36d576" />
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c0c0c" },
  header: {
    backgroundColor: "#0c0c0c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#36d576",
  },
  logo: { color: "#36d576", fontSize: 22, fontWeight: "bold" },
  navbar: { flexDirection: "row", gap: 10 },
  content: { flex: 1, padding: 10 },
  footer: {
    backgroundColor: "#0c0c0c",
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#36d576",
  },
  footerText: { color: "#aaa", fontSize: 14 },

  // Profile & Dropdown Styles
  profileContainer: { position: "relative" },
  profileIcon: { fontSize: 24, color: "#36d576", marginLeft: 10 },
  dropdown: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#36d576",
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
  },
});
