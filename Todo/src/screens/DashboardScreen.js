import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Picker,
} from "react-native";

export default function MultiStepForm({ navigate }) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("individual");
  const [eventName, setEventName] = useState("tech");
  const [transportType, setTransportType] = useState("public");
  const [numSeats, setNumSeats] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [document, setDocument] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleNext = () => {
    if (step === 1 && (!fullName || !email || !numSeats)) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    if (step === 2 && !address) {
      Alert.alert("Error", "Please enter your address.");
      return;
    }
    if (step === 3 && userType === "organization" && !document) {
      Alert.alert("Error", "Please upload a document.");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    if (!termsAccepted) {
      Alert.alert("Error", "Please accept the terms and conditions.");
      return;
    }
    Alert.alert("Success", userType === "individual" ? "Pass Generated!" : "Registration Successful!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Event Registration</Text>

          {/* Step 1: User Info */}
          {step === 1 && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />

              <Text style={styles.label}>User Type</Text>
              <Picker selectedValue={userType} onValueChange={setUserType} style={styles.input}>
                <Picker.Item label="Individual" value="individual" />
                <Picker.Item label="Organization" value="organization" />
              </Picker>

              <Text style={styles.label}>Event Name</Text>
              <Picker selectedValue={eventName} onValueChange={setEventName} style={styles.input}>
                <Picker.Item label="Tech Conference" value="tech" />
                <Picker.Item label="Music Festival" value="music" />
                <Picker.Item label="Business Meetup" value="business" />
              </Picker>

              <Text style={styles.label}>Number of Seats</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={numSeats} onChangeText={setNumSeats} />

              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: Address and Transport */}
          {step === 2 && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Full Address</Text>
              <TextInput style={styles.input} value={address} onChangeText={setAddress} />

              <Text style={styles.label}>Transport Type</Text>
              <Picker selectedValue={transportType} onValueChange={setTransportType} style={styles.input}>
                <Picker.Item label="Public Transport" value="public" />
                <Picker.Item label="Personal Vehicle" value="personal" />
              </Picker>

              {transportType === "personal" && (
                <>
                  <Text style={styles.label}>Vehicle Number</Text>
                  <TextInput style={styles.input} value={vehicleNumber} onChangeText={setVehicleNumber} />
                </>
              )}

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handlePrev}>
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Step 3: Document Upload & Terms */}
          {step === 3 && (
            <View style={styles.formContainer}>
              {userType === "organization" && (
                <>
                  <Text style={styles.label}>Upload Document</Text>
                  <TouchableOpacity style={styles.uploadButton} onPress={() => setDocument("Uploaded") }>
                    <Text style={styles.uploadText}>{document || "Upload File"}</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
                <Text style={styles.termsText}>{termsAccepted ? "✔ " : "○ "}Accept Terms & Conditions</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handlePrev}>
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1e21" },
  scrollContainer: { flexGrow: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", color: "#1BA94C", textAlign: "center", marginBottom: 20 },
  formContainer: { backgroundColor: "#2a2d32", padding: 20, borderRadius: 8 },
  label: { color: "#fff", marginBottom: 5 },
  input: { backgroundColor: "#3a3d42", color: "white", padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#1BA94C", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "white", fontWeight: "bold" }
});
