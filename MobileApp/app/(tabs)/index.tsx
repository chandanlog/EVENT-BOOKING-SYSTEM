import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HomeScreen from "../../src/screens/HomeScreen";
import TodoScreen from "../../src/screens/TodoScreen";
import DashboardScreen from "../../src/screens/DashboardScreen";
import LoginScreen from "../../src/screens/LoginScreen";
import RegisterScreen from "../../src/screens/RegisterScreen"; // Added RegisterScreen
import Layout from "./Layout";

// Define screen names
const SCREENS = {
  HOME: "Home",
  TODO: "ToDo",
  LOGIN: "Login",
  REGISTER: "Register", // Added Register
  DASHBOARD: "Dashboard",
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {/* Pass login state and navigation function to Layout */}
      <Layout navigate={setCurrentScreen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        {currentScreen === SCREENS.HOME && <HomeScreen navigate={setCurrentScreen} />}
        {currentScreen === SCREENS.TODO && <TodoScreen navigate={setCurrentScreen} />}
        {currentScreen === SCREENS.LOGIN && (
          <LoginScreen navigate={setCurrentScreen} setIsLoggedIn={setIsLoggedIn} />
        )}
        {currentScreen === SCREENS.REGISTER && <RegisterScreen navigate={setCurrentScreen} />} 
        {currentScreen === SCREENS.DASHBOARD && <DashboardScreen navigate={setCurrentScreen} />}
      </Layout>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
});
