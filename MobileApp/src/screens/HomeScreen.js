import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

const events = [
  { title: "React Conf 2025", date: "March 15, 2025", location: "San Francisco", image: "https://s3.amazonaws.com/angularminds.com/blog/media/React%20Summit-20240906120708414.png" },
  { title: "AI & ML Summit", date: "April 5, 2025", location: "New York", image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/Summit%20Poster%20Image.png" },
  { title: "Music Fest 2025", date: "May 20, 2025", location: "Los Angeles", image: "https://theindianmusicdiaries.com/wp-content/smush-webp/2024/12/Supersonic.jpg.webp" },
  { title: "Blockchain Expo", date: "June 10, 2025", location: "London", image: "https://blockchain-expo.com/europe/wp-content/uploads/2023/10/MicrosoftTeams-image-41.png" },
  { title: "Startup Pitch Day", date: "July 1, 2025", location: "Bangalore", image: "https://startupnv.org/wp-content/uploads/2023/08/pitchday.png" },
  { title: "Cyber Security Conference", date: "August 22, 2025", location: "Dubai", image: "https://events.holyrood.com/wp-content/uploads/2021/10/CyberSecurityScotland_900x517_Header.jpg" },
];

export default function HomeScreen({ navigate }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.headerText}>Find & Register for Top Events!</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search for events..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Event List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDetail}>📅 {item.date}</Text>
            <Text style={styles.eventDetail}>📍 {item.location}</Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigate("Register")}>
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1e21", padding: 15 },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#64ffda", textAlign: "center", marginBottom: 10 },
  searchInput: {
    backgroundColor: "#2c2f33",
    color: "white",
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#2c2f33",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  eventImage: { width: "100%", height: 150, borderRadius: 8 },
  eventTitle: { fontSize: 18, fontWeight: "bold", color: "#64ffda", marginTop: 5 },
  eventDetail: { fontSize: 14, color: "#b0bec5", marginTop: 2 },
  registerButton: {
    backgroundColor: "#1BA94C",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
