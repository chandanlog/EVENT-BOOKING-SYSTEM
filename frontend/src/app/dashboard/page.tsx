"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Container,
  Box,
  TextField,
  InputLabel,
  Select,
  FormControl,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function DashboardPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [numSeats, setNumSeats] = useState(1);
  const [userType, setUserType] = useState("normal");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Box sx={{ bgcolor: "#f4f4f9", minHeight: "100vh", color: "#333" }}>
      <AppBar position="static" sx={{ bgcolor: "#3b0083", boxShadow: 5 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Event Dashboard
          </Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar sx={{ bgcolor: "#fff" }}>
              <AccountCircleIcon color="primary" />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container sx={{ textAlign: "center", mt: 4, maxWidth: "800px" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "#3b0083" }}>
          Create an Event
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step><StepLabel>Event Details</StepLabel></Step>
          <Step><StepLabel>Upload Image</StepLabel></Step>
          <Step><StepLabel>Review & Submit</StepLabel></Step>
        </Stepper>
        <Card sx={{ background: "#fff", p: 4, borderRadius: 3, boxShadow: 5, mt: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select value={userType} onChange={(e) => setUserType(e.target.value)} sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
                  <MenuItem value="normal">Normal User</MenuItem>
                  <MenuItem value="organization">Organization</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} variant="outlined" fullWidth required sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }} />
              <TextField label="Event Date & Time" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} fullWidth required sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }} />
              <FormControl fullWidth>
                <InputLabel>Number of Seats</InputLabel>
                <Select value={numSeats} onChange={(e) => setNumSeats(Number(e.target.value))} disabled={userType === "normal"} sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }}>
                  {[1, 2, 3, 4, 5, 10, 20, 50].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" component="label" fullWidth sx={{ bgcolor: "#3b0083", borderRadius: 3, boxShadow: 2 }}>
                Upload Image
                <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
              </Button>
              <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} fullWidth required sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 2 }} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
